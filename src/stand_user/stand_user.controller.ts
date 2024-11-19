import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StandUserService } from './stand_user.service';
import { CreateStandUserDto } from './dto/create-stand_user.dto';
import { UpdateStandUserDto } from './dto/update-stand_user.dto';

@Controller('api/standuser')
export class StandUserController {
  constructor(private readonly standUserService: StandUserService) { }

  @Post()
  create(@Body() createStandUserDto: CreateStandUserDto) {
    return this.standUserService.create(createStandUserDto);
  }

  @Get()
  findAll() {
    return this.standUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standUserService.findOne(+id);
  }

  @Get('iduser/:userId')
  findStandsForUserId(@Param('userId') userId: string) {
    return this.standUserService.getStandForUserById(+userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStandUserDto: UpdateStandUserDto) {
    return this.standUserService.update(+id, updateStandUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standUserService.remove(+id);
  }
}
