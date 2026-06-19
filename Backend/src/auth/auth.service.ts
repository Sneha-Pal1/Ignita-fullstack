import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRole } from './enum/user-role.enum';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private readonly resetTokenRepo: Repository<PasswordResetToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const exits = await this.userRepo.findOneBy({
      email: dto.email,
    });
    if (exits) {
      throw new ConflictException('Email already registered');
    }
    const hash = await this.hashPassword(dto.password);
    const user = this.userRepo.create({
      ...dto,
      role: dto.role ?? UserRole.USER,
      password: hash,
    });
    const savedUser = await this.userRepo.save(user);
    const tokens = this.generateTokens(savedUser);
    return {
      ...tokens,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        role: savedUser.role,
      },
      message: 'user registered successfully',
    };
  }

  async createAdmin(dto: CreateAdminDto) {
    const exits = await this.userRepo.findOneBy({
      email: dto.email,
    });
    if (exits) {
      throw new ConflictException('Email already registered');
    }

    const hash = await this.hashPassword(dto.password);
    const user = this.userRepo.create({
      ...dto,
      role: UserRole.ADMIN,
      password: hash,
    });

    const savedUser = await this.userRepo.save(user);

    return {
      message: 'admin account created successfully',
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        role: savedUser.role,
      },
    };
  }
  async login(dto: LoginDto) {
    console.log('🔐 Login attempt for email:', dto.email);

    const user = await this.userRepo.findOneBy({
      email: dto.email,
    });

    if (!user) {
      console.log('❌ User not found:', dto.email);
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.verifyPassword(
      dto.password,
      user.password,
    );
    console.log(
      '🔑 Password verification:',
      passwordMatch ? 'MATCH' : 'NO MATCH',
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.generateTokens(user);
    console.log('✅ Tokens generated for user:', user.id);
    console.log(
      '📦 Access Token preview:',
      tokens.accessToken.substring(0, 30) + '...',
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  async googleLogin(dto: GoogleAuthDto) {
    let user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    // Create user if not exists
    if (!user) {
      user = this.userRepo.create({
        email: dto.email,
        name: dto.name,
        phone: null,
        password: '',
        role: UserRole.USER,
      });

      user = await this.userRepo.save(user);
    }

    const tokens = this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refreshAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token required');
    }

    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(
        refreshToken,
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        },
      );

      const user = await this.userRepo.findOneBy({ id: payload.sub });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        accessToken: this.generateAccessToken(user),
        message: 'access token refreshed successfully',
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.userRepo.findOneBy({ email: dto.email });

    // Always return success to prevent user enumeration
    if (!user) {
      return { message: 'If an account with that email exists, a reset link has been sent.' };
    }

    // Remove any existing reset tokens for this user
    await this.resetTokenRepo.delete({ user: { id: user.id } });

    // Generate a secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const resetToken = this.resetTokenRepo.create({
      user,
      tokenHash,
      expiresAt,
    });
    await this.resetTokenRepo.save(resetToken);

    await this.emailService.sendPasswordResetEmail(user.email, rawToken);

    return { message: 'If an account with that email exists, a reset link has been sent.' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    // Hash the incoming raw token to compare with stored hash
    const tokenHash = crypto
      .createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const resetToken = await this.resetTokenRepo.findOne({
      where: { tokenHash },
      relations: ['user'],
    });

    if (!resetToken) {
      throw new BadRequestException('Invalid or expired password reset token.');
    }

    if (new Date() > resetToken.expiresAt) {
      await this.resetTokenRepo.delete(resetToken.id);
      throw new BadRequestException('Password reset token has expired. Please request a new one.');
    }

    // Update the user's password
    const newHash = await this.hashPassword(dto.password);
    await this.userRepo.update(resetToken.user.id, { password: newHash });

    // Invalidate the token (single use)
    await this.resetTokenRepo.delete(resetToken.id);

    return { message: 'Password has been reset successfully.' };
  }

  private async hashPassword(pw: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(pw, saltRounds);
  }

  private async verifyPassword(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }

  private generateTokens(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRY') || '15m',
    });
  }
  private generateRefreshToken(user: User): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRY') || '7d',
    });
  }
}
