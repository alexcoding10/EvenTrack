import { Module } from '@nestjs/common';
import { StandEventService } from './stand_event.service';
import { StandEventController } from './stand_event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StandEventController],
  providers: [StandEventService],
  imports:[PrismaModule]
})
export class StandEventModule {}
