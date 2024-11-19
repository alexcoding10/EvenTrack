import { Module } from '@nestjs/common';
import { StandUserService } from './stand_user.service';
import { StandUserController } from './stand_user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StandUserController],
  providers: [StandUserService],
  imports:[PrismaModule]
})
export class StandUserModule {}
