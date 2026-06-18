import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentController } from './recruitment.controller';
import { RecruitmentService } from './recruitment.service';
import { UploadService } from '../upload/upload.service';

describe('RecruitmentController', () => {
  let controller: RecruitmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentController],
      providers: [
        {
          provide: RecruitmentService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            submitApplication: jest.fn(),
            findAllApplications: jest.fn(),
          },
        },
        {
          provide: UploadService,
          useValue: { uploadFile: jest.fn(), uploadImage: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<RecruitmentController>(RecruitmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
