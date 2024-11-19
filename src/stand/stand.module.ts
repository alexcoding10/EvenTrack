import { Module } from '@nestjs/common';
import { StandService } from './stand.service';
import { StandController } from './stand.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StandController],
  providers: [StandService],
  imports:[PrismaModule]
})
export class StandModule {}
