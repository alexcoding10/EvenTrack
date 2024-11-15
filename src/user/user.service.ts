import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'



@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }


    async getAllUser(): Promise<User[]> {
        return await this.prisma.user.findMany({include:{
            jobPost:true,
            events:true,
            company:true,
            stands:true
        }});
    }
    async getUserByID(id: number): Promise<User> {
        const userFound = await this.prisma.user.findUnique({
            where: {
                id
            },
            include:{
                company:true,
                events:true,
                jobPost:true,
                stands:true
            }
        });

        if (!userFound)  throw new NotFoundException('Usuario no encontrado') 
        
        return userFound
    }
    async createUser(data:CreateUserDto): Promise<User> {

        try {
            //debemos hacer un hash en la contraseña antes de guardarla
            data.password = await this.hashPassword(data.password);

            return await this.prisma.user.create({ data: data });
            
        } catch (error) {
            throw new BadRequestException('Los datos no son correctos')
        }
    }

    async updateUser(id: number, data: User): Promise<User> {

        try {
            return await this.prisma.user.update({ where: { id }, data })
            
        } catch (error) {
            throw new NotFoundException('El usuario no existe')
        }
    }
    async deleteUser(id: number): Promise<User> {
        try{
            return await this.prisma.user.delete({ where: { id } });
        }catch (error) {
            throw new NotFoundException('El usuario no existe')
        }
    }

    async findByEmail(email:string):Promise<User | null>{
        try{
            return await this.prisma.user.findUnique({ where: { email } });
        }catch (error) {
            throw new NotFoundException('El usuario no existe')
        }
    }
    //funcion para hash password
    async hashPassword(password:string){
        const salt = await bcrypt.genSalt(10)
        return  await bcrypt.hash(password,salt)
    }

}
