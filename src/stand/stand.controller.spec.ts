import { Test, TestingModule } from '@nestjs/testing';
import { StandController } from './stand.controller';
import { StandService } from './stand.service';

describe('StandController', () => {
  let controller: StandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandController],
      providers: [StandService],
    }).compile();

    controller = module.get<StandController>(StandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
