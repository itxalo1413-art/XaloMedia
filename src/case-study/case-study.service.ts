import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaseStudy, CaseStudyDocument } from './entities/case-study.entity';
import { Industry, IndustryDocument } from '../industry/entities/industry.entity';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';

@Injectable()
export class CaseStudyService {
  constructor(
    @InjectModel(CaseStudy.name)
    private readonly caseStudyModel: Model<CaseStudyDocument>,
    @InjectModel(Industry.name)
    private readonly industryModel: Model<IndustryDocument>,
  ) {}

  async findAll(industry?: string): Promise<CaseStudyDocument[]> {
    const filter: Record<string, unknown> = { isActive: true };
    if (industry) {
      const industryDoc = await this.industryModel.findOne({ slug: industry }).exec();
      if (industryDoc) {
        filter.industry = industryDoc._id;
      } else {
        return []; // Industry not found, return empty
      }
    }
    return this.caseStudyModel
      .find(filter)
      .populate('industry service level')
      .sort({ order: 1 })
      .exec();
  }

  findOne(id: string): Promise<CaseStudyDocument | null> {
    return this.caseStudyModel.findById(id).populate('industry service level').exec();
  }

  async create(createCaseStudyDto: CreateCaseStudyDto): Promise<CaseStudyDocument> {
    const createdCaseStudy = new this.caseStudyModel(createCaseStudyDto);
    return createdCaseStudy.save();
  }

  async update(id: string, updateCaseStudyDto: UpdateCaseStudyDto): Promise<CaseStudyDocument | null> {
    return this.caseStudyModel
      .findByIdAndUpdate(id, updateCaseStudyDto, { returnDocument: 'after' })
      .populate('industry service level')
      .exec();
  }

  async remove(id: string): Promise<CaseStudyDocument | null> {
    return this.caseStudyModel.findByIdAndDelete(id).exec();
  }
}
