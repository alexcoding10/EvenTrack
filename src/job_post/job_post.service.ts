import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JobPost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobPost } from './dto/create-job-post.dto';

@Injectable()
export class JobPostService {
    constructor(private prisma: PrismaService) { }

    async createJobPost(data: CreateJobPost): Promise<JobPost> {
        try {
            return await this.prisma.jobPost.create({ data: data })
        } catch (error) {
            throw new BadRequestException('Los datos del puesto de trabajo no son correctos')
        }
    }

    async getAllJobPost(): Promise<JobPost[]> {
        //te lo devuelve de manera ordenada
        return this.prisma.jobPost.findMany({orderBy:{name:'asc'}});
    }

    async getJobPostById(id: number): Promise<JobPost | null> {
        const jobFound = await this.prisma.jobPost.findUnique({ where: { id: id, }, })

        if (!jobFound) throw new NotFoundException(`Puesto de trabajo con id -> ${id} no encontrado`)

        return jobFound
    }

    async remove(id: number):Promise<JobPost> {

        try {
        return await this.prisma.jobPost.delete({where:{id}})
          
        } catch (error) {
          throw new NotFoundException('El puesto de trabajo no existe')
        }
      }
}
