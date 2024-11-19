import { Test, TestingModule } from '@nestjs/testing';
import { EventUserService } from './event_user.service';

describe('EventUserService', () => {
  let service: EventUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventUserService],
    }).compile();

    service = module.get<EventUserService>(EventUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
