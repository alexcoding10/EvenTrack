import { Module } from '@nestjs/common';
import { JobPostService } from './job_post.service';
import { JobPostController } from './job_post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JobPostController],
  providers: [JobPostService],
  imports:[PrismaModule]
})
export class JobPostModule {}
