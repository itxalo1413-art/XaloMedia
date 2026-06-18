import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentService } from './recruitment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Job } from './entities/job.entity';
import { JobApplication } from './entities/job-application.entity';

describe('RecruitmentService', () => {
  let service: RecruitmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecruitmentService,
        { provide: getModelToken(Job.name), useValue: {} },
        { provide: getModelToken(JobApplication.name), useValue: {} },
      ],
    }).compile();

    service = module.get<RecruitmentService>(RecruitmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
