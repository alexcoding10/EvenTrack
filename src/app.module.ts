import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobPostModule } from './job_post/job_post.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { StandModule } from './stand/stand.module';
import { StandEventModule } from './stand_event/stand_event.module';
import { EventUserModule } from './event_user/event_user.module';
import { StandUserModule } from './stand_user/stand_user.module';

@Module({
  imports: [UserModule, PrismaModule, JobPostModule, CompanyModule, AuthModule, EventModule, StandModule, StandEventModule, EventUserModule, StandUserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
