import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStandUserDto } from './dto/create-stand_user.dto';
import { UpdateStandUserDto } from './dto/update-stand_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StandUserService {

  constructor(private prisma: PrismaService) { }

  async create(createStandUserDto: CreateStandUserDto) {
    try {
      return await this.prisma.standUser.create({ data: createStandUserDto });
    } catch (error) {
      throw new BadRequestException('Los datos enviados no son correctos para crear un stand')
    }
  }

  async findAll() {
    return await this.prisma.standUser.findMany();

  }

  async findOne(id: number) {
    const standUserFound = await this.prisma.standUser.findUnique({ where: { id } });
    if (!standUserFound) throw new NotFoundException('Stand no encotrado')
    return standUserFound
  }

  async update(id: number, updateStandUserDto: UpdateStandUserDto) {
    try {
      return await this.prisma.standUser.update({ where: { id }, data: updateStandUserDto })
    } catch (error) {
      throw new NotFoundException('El standUser no existe')
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.standUser.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException('El standUser no existe')
    }
  }

  async getStandForUserById(userId: number) {
    const standUserFound = await this.prisma.standUser.findMany({ where: { userId } });
    if (!standUserFound) throw new NotFoundException('Stand no encotrado')
    return standUserFound
  }
}
