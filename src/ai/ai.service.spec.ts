import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { ConfigService } from '@nestjs/config';

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'GEMINI_API_KEY') return 'test-key';
              if (key === 'GEMINI_MODEL') return 'gemini-2.5-flash';
              if (key === 'GEMINI_TEMPERATURE') return '0.7';
              if (key === 'GEMINI_TIMEOUT_MS') return '1';
              if (key === 'GEMINI_MAX_CONCURRENT') return '1';
              return undefined;
            },
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
