import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {

  constructor(private prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.prisma.event.create({ data: createEventDto });
    } catch (error) {
      throw new BadRequestException('Los datos del puesto de evento no son correctos')
    }
  }

  async findAll() {
    return await this.prisma.event.findMany()
  }

  async findOne(id: number) {
    const eventFound = await this.prisma.event.findUnique({ where: { id: id, } })

    if (!eventFound) throw new NotFoundException(`Puesto de evento con id -> ${id} no encontrado`)

    return eventFound
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      return await this.prisma.event.update({where:{id},data:updateEventDto})
    } catch (error) {
      throw new BadRequestException('Los datos del puesto de evento no son correctos')
    }
  }
  

  async remove(id: number) {
    try {
      return await this.prisma.event.delete({where:{id}})
        
      } catch (error) {
        throw new NotFoundException('El puesto de trabajo no existe')
      }
    }
  
}
