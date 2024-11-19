import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StandService } from './stand.service';
import { CreateStandDto } from './dto/create-stand.dto';
import { UpdateStandDto } from './dto/update-stand.dto';

@Controller('api/stand')
export class StandController {
  constructor(private readonly standService: StandService) {}

  @Post()
  create(@Body() createStandDto: CreateStandDto) {
    return this.standService.create(createStandDto);
  }

  @Get()
  findAll() {
    return this.standService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStandDto: UpdateStandDto) {
    return this.standService.update(+id, updateStandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standService.remove(+id);
  }
}
