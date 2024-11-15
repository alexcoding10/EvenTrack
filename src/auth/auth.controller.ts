import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new BadRequestException('Credenciales invalidos');
      }
      return await this.authService.login(user); // Devuelve el token JWT
    }
}
