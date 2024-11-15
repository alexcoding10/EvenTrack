import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JobPostService } from './job_post.service';
import { JobPost } from '@prisma/client';
import { CreateJobPost } from './dto/create-job-post.dto';


@Controller('api/jobpost')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Get()
  async getAllJobPost():Promise<JobPost[]>{
    return await this.jobPostService.getAllJobPost()
  }

  @Get(':id')
  async getJobPostById(@Param('id') id:string):Promise<JobPost | null>{
    return await this.jobPostService.getJobPostById(Number(id));
  }

  @Post()
  async createPostJob(@Body() createPostDto:CreateJobPost): Promise<JobPost>{
    return await this.jobPostService.createJobPost(createPostDto)
  }
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<JobPost>{
    return await this.jobPostService.remove(Number(id));
  }

}

