import { Test, TestingModule } from '@nestjs/testing';
import { StandUserService } from './stand_user.service';

describe('StandUserService', () => {
  let service: StandUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandUserService],
    }).compile();

    service = module.get<StandUserService>(StandUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
