import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from '../service/entities/service.entity';
import { CaseStudy, CaseStudySchema } from '../case-study/entities/case-study.entity';
import { Partner, PartnerSchema } from '../partner/entities/partner.entity';
import { Faq, FaqSchema } from '../faq/entities/faq.entity';
import { Industry, IndustrySchema } from '../industry/entities/industry.entity';
import { Level, LevelSchema } from '../level/entities/level.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: CaseStudy.name, schema: CaseStudySchema },
      { name: Partner.name, schema: PartnerSchema },
      { name: Faq.name, schema: FaqSchema },
      { name: Industry.name, schema: IndustrySchema },
      { name: Level.name, schema: LevelSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
