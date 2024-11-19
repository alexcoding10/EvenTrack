import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStandDto } from './dto/create-stand.dto';
import { UpdateStandDto } from './dto/update-stand.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class StandService {

  constructor(private prisma: PrismaService) { }

  async create(createStandDto: CreateStandDto) {
    try {
      return await this.prisma.stand.create({ data: createStandDto });
    } catch (error) {
       throw new BadRequestException('Los datos enviados no son correctos para crear un stand')
    }
  }

  async findAll() {
    return await this.prisma.stand.findMany();
  }

  async findOne(id: number) {
    const standFound = await this.prisma.stand.findUnique({where:{id}});
    if(!standFound) throw new NotFoundException('Stand no encotrado')
    return standFound
  }

  async update(id: number, updateStandDto: UpdateStandDto) {
    try {
      return await this.prisma.stand.update({where:{id},data:updateStandDto})
    } catch (error) {
      throw new NotFoundException('El stand no existe')
      
    }
  }

  async remove(id: number) {
    
    try {
      return await this.prisma.stand.delete({where:{id}})
        
      } catch (error) {
        throw new NotFoundException('El stand no existe')
      }
  }
}
