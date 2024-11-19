import { Test, TestingModule } from '@nestjs/testing';
import { StandUserController } from './stand_user.controller';
import { StandUserService } from './stand_user.service';

describe('StandUserController', () => {
  let controller: StandUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandUserController],
      providers: [StandUserService],
    }).compile();

    controller = module.get<StandUserController>(StandUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
