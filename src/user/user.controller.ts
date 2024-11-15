import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    async getAllUser():Promise<User[]>{
        return await this.userService.getAllUser()
    }
    @Get(':id')
    async getUser(@Param('id') id:string):Promise<User>{
        try {
            return await this.userService.getUserByID(Number(id))
            
        } catch (error) {
            throw new BadRequestException('El id debe ser un número entero')
        }
    }
    @Post()
    async createUser(@Body() createUserDto:CreateUserDto):Promise<User>{
        return await this.userService.createUser(createUserDto)
    }
    @Get()
    async deleteUser(@Param('id') id:string):Promise<User>{
        try {
            return await this.userService.deleteUser(Number(id))            
        } catch (error) {
            throw new BadRequestException('El id debe ser un número entero')
        }
    }
    @Put(':id')
    async updateUser(@Param('id') id:string ,@Body() user:User):Promise<User>{
        try {         
            return await this.userService.updateUser(Number(id),user)
        } catch (error) {
            throw new BadRequestException('Error BadRequest: ', error)
        }
    }
}
