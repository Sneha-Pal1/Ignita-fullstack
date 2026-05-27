import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
