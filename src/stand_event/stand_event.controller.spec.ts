import { Test, TestingModule } from '@nestjs/testing';
import { StandEventController } from './stand_event.controller';
import { StandEventService } from './stand_event.service';

describe('StandEventController', () => {
  let controller: StandEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandEventController],
      providers: [StandEventService],
    }).compile();

    controller = module.get<StandEventController>(StandEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
