import { Test, TestingModule } from '@nestjs/testing';
import { EventUserController } from './event_user.controller';
import { EventUserService } from './event_user.service';

describe('EventUserController', () => {
  let controller: EventUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventUserController],
      providers: [EventUserService],
    }).compile();

    controller = module.get<EventUserController>(EventUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
