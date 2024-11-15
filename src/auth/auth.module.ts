import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET, // Debes definir tu clave secreta en el archivo .env
          signOptions: { expiresIn: '60m' }, // El token expirará en 60 minutos
        }),
        UserModule, // Importamos el módulo de usuarios
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
})
export class AuthModule {}
