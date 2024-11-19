import { Module } from '@nestjs/common';
import { EventUserService } from './event_user.service';
import { EventUserController } from './event_user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EventUserController],
  providers: [EventUserService],
  imports:[
    PrismaModule
  ]
})
export class EventUserModule {}
