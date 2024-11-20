import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStandUserDto } from './dto/create-stand_user.dto';
import { UpdateStandUserDto } from './dto/update-stand_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStandEventDto } from 'src/stand_event/dto/update-stand_event.dto';

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
    const standUserFound = await this.prisma.standUser.findMany({ where: { userId }, include: { stand: true } });
    if (!standUserFound) throw new NotFoundException('Stand no encotrado')
    return standUserFound
  }

  async getStandUserForEventByIds(userId: number, eventId: number) {
    // Obtener todos los stands asociados al usuario
    const allStandUser = await this.getStandForUserById(userId);

    // Si no se encuentran stands para el usuario, retorna un array vacío
    if (allStandUser.length === 0) return [];

    // Obtener los stands asociados al evento
    const standForEvent = await this.prisma.standEvent.findMany({
      where: { eventId },
      include: { stand: true }, // Incluir los detalles del stand
    });

    // Filtrar los stands del usuario para encontrar aquellos que están asociados al evento
    const standUserForEvent = allStandUser.filter((standUser) =>
      // Compara el `standId` del usuario con los `standId` del evento
      standForEvent.some((event) => event.stand.id === standUser.standId)
    );

    return standUserForEvent;
  }

  async updateExitStandUser(updateStandUserDto: UpdateStandUserDto) {
    const { standId, userId, exitDate } = updateStandUserDto;

    // Validar parámetros necesarios
    if (!standId || !userId || !exitDate) {
      throw new BadRequestException('Faltan parámetros necesarios');
    }
  
    // Buscar el último registro del stand visitado
    const lastStandVisited = await this.prisma.standUser.findFirst({
      where: { standId, userId },
      orderBy: { id: 'desc' }, // Último registro
    });
  
    if (!lastStandVisited) {
      throw new NotFoundException('No se encontró ningún registro del stand para este usuario');
    }
  
    // Verificar si ya existe una fecha de salida
    if (lastStandVisited.exitDate) {
      throw new BadRequestException('El usuario ya ha registrado una salida del stand');
    }
  
    // Actualizar el registro con la nueva fecha de salida
    const updatedStandUser = await this.prisma.standUser.update({
      where: { id: lastStandVisited.id },
      data: { exitDate },
    });
  
    return {
      message: 'Registro actualizado con éxito',
      standUser: updatedStandUser,
    };
  }
  

}
