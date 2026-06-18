import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './setting.service';
import { getModelToken } from '@nestjs/mongoose';
import { Setting } from './schemas/setting.schema';

describe('SettingService', () => {
  let service: SettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        {
          provide: getModelToken(Setting.name),
          useValue: {
            findOne: jest.fn(() => ({ exec: jest.fn() })),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SettingService>(SettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
