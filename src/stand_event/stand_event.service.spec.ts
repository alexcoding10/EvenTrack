import { Test, TestingModule } from '@nestjs/testing';
import { StandEventService } from './stand_event.service';

describe('StandEventService', () => {
  let service: StandEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandEventService],
    }).compile();

    service = module.get<StandEventService>(StandEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
