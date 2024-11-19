import { Test, TestingModule } from '@nestjs/testing';
import { StandService } from './stand.service';

describe('StandService', () => {
  let service: StandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandService],
    }).compile();

    service = module.get<StandService>(StandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
