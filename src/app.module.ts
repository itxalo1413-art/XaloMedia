import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ServiceModule } from './service/service.module';
import { CaseStudyModule } from './case-study/case-study.module';
import { PartnerModule } from './partner/partner.module';
import { FaqModule } from './faq/faq.module';
import { SeedModule } from './seed/seed.module';
import { IndustryModule } from './industry/industry.module';
import { LevelModule } from './level/level.module';
import { UploadModule } from './upload/upload.module';
import { SettingModule } from './setting/setting.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { RecruitmentModule } from './recruitment/recruitment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Rate limiting: max 60 requests per 60 seconds globally
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 60,
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    ContactModule,
    ServiceModule,
    CaseStudyModule,
    PartnerModule,
    FaqModule,
    SeedModule,
    IndustryModule,
    LevelModule,
    UploadModule,
    SettingModule,
    AuthModule,
    AiModule,
    RecruitmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply throttle guard globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
