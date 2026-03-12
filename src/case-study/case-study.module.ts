import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseStudy, CaseStudySchema } from './entities/case-study.entity';
import { Industry, IndustrySchema } from '../industry/entities/industry.entity';
import { CaseStudyService } from './case-study.service';
import { CaseStudyController } from './case-study.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CaseStudy.name, schema: CaseStudySchema },
      { name: Industry.name, schema: IndustrySchema },
    ]),
  ],
  controllers: [CaseStudyController],
  providers: [CaseStudyService],
})
export class CaseStudyModule {}
