import { Test, TestingModule } from '@nestjs/testing';
import { JobPostController } from './job_post.controller';
import { JobPostService } from './job_post.service';

describe('JobPostController', () => {
  let controller: JobPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostController],
      providers: [JobPostService],
    }).compile();

    controller = module.get<JobPostController>(JobPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
