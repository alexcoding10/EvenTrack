import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventUserService } from './event_user.service';
import { CreateEventUserDto } from './dto/create-event_user.dto';
import { UpdateEventUserDto } from './dto/update-event_user.dto';

@Controller('api/eventuser')
export class EventUserController {
  constructor(private readonly eventUserService: EventUserService) {}

  @Post()
  create(@Body() createEventUserDto: CreateEventUserDto) {
    console.log(createEventUserDto)
    return this.eventUserService.create(createEventUserDto);
  }

  @Get()
  findAll() {
    return this.eventUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventUserService.findOne(+id);
  }

  @Get('iduser/:idUser')
  findEventForUserById(@Param('idUser') idUser:string){
    return this.eventUserService.getEventForUserById(+idUser)
  }
  
  @Patch('exit')
  updateEventForUser(@Body() UpdateEventUserDto:UpdateEventUserDto){
    return this.eventUserService.updateExitDateForUser(UpdateEventUserDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventUserDto: UpdateEventUserDto) {
    return this.eventUserService.update(+id, updateEventUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventUserService.remove(+id);
  }
}
