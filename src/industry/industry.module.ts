import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Industry, IndustrySchema } from './entities/industry.entity';
import { IndustryService } from './industry.service';
import { IndustryController } from './industry.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Industry.name, schema: IndustrySchema }])],
  controllers: [IndustryController],
  providers: [IndustryService],
})
export class IndustryModule {}
