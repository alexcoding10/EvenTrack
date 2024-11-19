import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StandEventService } from './stand_event.service';
import { CreateStandEventDto } from './dto/create-stand_event.dto';
import { UpdateStandEventDto } from './dto/update-stand_event.dto';

@Controller('api/standevent')
export class StandEventController {
  constructor(private readonly standEventService: StandEventService) {}

  @Post()
  create(@Body() createStandEventDto: CreateStandEventDto) {
    return this.standEventService.create(createStandEventDto);
  }

  @Get()
  findAll() {
    return this.standEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standEventService.findOne(+id);
  }

  @Get('idevent/:eventId')
  findStandForEvent(@Param('eventId') eventId:string){
    console.log('eventId recibido:', eventId); // Verifica el valor del eventId
    return this.standEventService.getStandForEvent(+eventId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStandEventDto: UpdateStandEventDto) {
    return this.standEventService.update(+id, updateStandEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standEventService.remove(+id);
  }
}
