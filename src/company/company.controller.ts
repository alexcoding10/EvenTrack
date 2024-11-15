import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from '@prisma/client';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto):Promise<Company>  {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll():Promise<Company[]>  {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Company>  {
    return await this.companyService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: Company):Promise<Company>  {
    return await this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<Company>  {
    return await this.companyService.remove(+id);
  }
}
