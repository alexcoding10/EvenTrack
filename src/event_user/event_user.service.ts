import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventUserDto } from './dto/create-event_user.dto';
import { UpdateEventUserDto } from './dto/update-event_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventUserService {

  constructor(private prisma: PrismaService) { }

  async create(createEventUserDto: CreateEventUserDto) {
    try {

      return await this.prisma.eventUser.create({ data: createEventUserDto })
    } catch (error) {
      throw new BadRequestException('Los datos enviados no son correctos para crear un eventUser')
    }
  }

  async findAll() {
    return await this.prisma.eventUser.findMany()
  }

  async findOne(id: number) {
    const eventUserFound = await this.prisma.eventUser.findUnique({ where: { id } })

    if (!eventUserFound) throw new NotFoundException('eventUser no encontrado')
    return eventUserFound;
  }

  async update(id: number, updateEventUserDto: UpdateEventUserDto) {
    try {
      return await this.prisma.eventUser.update({ where: { id }, data: updateEventUserDto })
    } catch (error) {
      throw new NotFoundException('El eventUser no existe')
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.eventUser.delete({ where: { id } })

    } catch (error) {
      throw new NotFoundException('El eventUser no existe')
    }
  }

  async getEventForUserById(idUser: number) {
    return await this.prisma.eventUser.findMany({
      where: {
        userId: idUser,
      },
      include: {
        event: true,
        user: true
      }
    })
  }
  async updateExitDateForUser(updateEvent: UpdateEventUserDto) {
    // Validar que se proporcionen todos los parámetros necesarios
    if (!updateEvent.eventId || !updateEvent.userId) {
      throw new BadRequestException('Falta el id de usuario o del evento');
    }

    // Buscar el último evento asociado al usuario y el evento
    const lastEvent = await this.prisma.eventUser.findFirst({
      where: { eventId: updateEvent.eventId, userId: updateEvent.userId },
      orderBy: { id: 'desc' }, // Ordenar por ID de forma descendente para obtener el último
    });

    // Verificar si se encontró un evento
    if (!lastEvent) {
      throw new NotFoundException('No se encontró ningún evento para este usuario');
    }

    // Verificar si el usuario ya ha salido del evento
    if (lastEvent.exitDate) {
      throw new BadRequestException('El usuario ya ha salido del evento');
    }

    // Actualizar el evento con los nuevos datos
    return await this.prisma.eventUser.update({
      where: { id: lastEvent.id },
      data: updateEvent,
    });
  }
}

