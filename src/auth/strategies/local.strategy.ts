import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Usamos 'email' como nombre de usuario
  }

  async validate(email: string, password: string) {
    return this.authService.validateUser(email, password); // Valida las credenciales
  }
}
