import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'CLOUDINARY_CLOUD_NAME') return 'test';
              if (key === 'CLOUDINARY_API_KEY') return 'test';
              if (key === 'CLOUDINARY_API_SECRET') return 'test';
              if (key === 'CLOUDINARY_IMAGE_FOLDER') return 'xalomedia';
              if (key === 'CLOUDINARY_CV_FOLDER') return 'xalomedia/cv';
              return undefined;
            },
          },
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
