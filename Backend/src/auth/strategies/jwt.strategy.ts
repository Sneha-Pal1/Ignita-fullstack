import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET') || 'fallback-secret';
    console.log(
      '🔐 JWT Strategy initialized with secret:',
      secret.substring(0, 10) + '...',
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    console.log('🔍 JWT Validation - Payload:', payload);
    const user = {
      id: payload.sub,
      phone: payload.phone,
    };
    console.log('✅ JWT Validated User:', user);
    return user;
  }
}
