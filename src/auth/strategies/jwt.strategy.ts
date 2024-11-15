// auth/strategies/jwt.strategy.ts

import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { JwtPayload } from '../jwt-payload.interface';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token desde el header 'Authorization'
      secretOrKey: process.env.JWT_SECRET, // Clave secreta para verificar el token
    });
  }

  async validate(payload: JwtPayload) {
    // Aquí puedes validar el payload (por ejemplo, encontrar al usuario por ID)
    return { userId: payload.sub, email: payload.email };
  }
}
