import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {

  constructor(private prisma:PrismaService ){}

  async create(createCompanyDto: CreateCompanyDto):Promise<Company>  {
    try {
      
      return await this.prisma.company.create({data:createCompanyDto})
    } catch (error) {
      throw new BadRequestException('Los datos enviados no son correctos para crear un company')
    }
  }

  async findAll() :Promise<Company[]> {
    return await this.prisma.company.findMany({orderBy:{name:'asc'}})
    
  }

  async findOne(id: number):Promise<Company>  {
    const companyFound = await this.prisma.company.findUnique({where:{id}})

    if(!companyFound)  throw new NotFoundException('Company no encontrado')
    return companyFound;
  }

  async update(id: number, updateCompanyDto: Company):Promise<Company>  {
    try {
      return await this.prisma.company.update({where:{id},data:updateCompanyDto})
    } catch (error) {
      throw new NotFoundException('El company no existe')
      
    }
  }

  async remove(id: number):Promise<Company> {

    try {
    return await this.prisma.company.delete({where:{id}})
      
    } catch (error) {
      throw new NotFoundException('El company no existe')
    }
  }
}
