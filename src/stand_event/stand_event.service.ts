import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStandEventDto } from './dto/create-stand_event.dto';
import { UpdateStandEventDto } from './dto/update-stand_event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StandEventService {
  constructor(private prisma: PrismaService) { }

  async create(createStandEventDto: CreateStandEventDto) {
    try {
      return await this.prisma.standEvent.create({ data: createStandEventDto });
    } catch (error) {
      throw new BadRequestException('Los datos enviados no son correctos para crear un stand')
    }
  }

  async findAll() {
    return await this.prisma.standEvent.findMany();
  }

  async findOne(id: number) {
    const standEventFound = await this.prisma.standEvent.findUnique({ where: { id } });
    if (!standEventFound) throw new NotFoundException('Stand no encotrado')
    return standEventFound
  }

  async update(id: number, updateStandEventDto: UpdateStandEventDto) {
    try {
      return await this.prisma.standEvent.update({ where: { id }, data: updateStandEventDto })
    } catch (error) {
      throw new NotFoundException('El standEvent no existe')

    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.standEvent.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException('El standEvent no existe')
    }
  }

  async getStandForEvent(eventId: number) {
    const standEventFound = await this.prisma.standEvent.findMany({ where: { eventId }, include: { event: true, stand: true } });
    if (!standEventFound) throw new NotFoundException('Stands no encotrado')
    return standEventFound
  }
}
