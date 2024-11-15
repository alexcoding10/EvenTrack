import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    // Método para validar las credenciales del usuario
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            // Devuelves el usuario sin la contraseña
            
            const { password, ...result } = user;
            return result;
        }
        
        return null;
    }

    // Método para generar un JWT
    async login(user: any) {
        const payload: JwtPayload = { email: user.email, sub: user.id };
        
        return {
            access_token: this.jwtService.sign(payload), // Genera el token
        };
    }
}
