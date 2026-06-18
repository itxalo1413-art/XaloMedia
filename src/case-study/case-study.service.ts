import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaseStudy, CaseStudyDocument } from './entities/case-study.entity';
import { Industry, IndustryDocument } from '../industry/entities/industry.entity';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';

type PaginationParams = { limit?: number; page?: number };
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class CaseStudyService {
  constructor(
    @InjectModel(CaseStudy.name)
    private readonly caseStudyModel: Model<CaseStudyDocument>,
    @InjectModel(Industry.name)
    private readonly industryModel: Model<IndustryDocument>,
  ) {}

  async findAll(industry?: string, params: PaginationParams = {}): Promise<CaseStudyDocument[]> {
    const filter: Record<string, unknown> = { isActive: true };
    if (industry) {
      const industryDoc = await this.industryModel
        .findOne({ slug: industry })
        .select('_id')
        .lean()
        .exec();
      if (industryDoc) {
        filter.industry = industryDoc._id;
      } else {
        return []; // Industry not found, return empty
      }
    }
    const limit = clampLimit(params.limit);
    const page = clampPage(params.page);
    const skip = (page - 1) * limit;

    return this.caseStudyModel
      .find(filter)
      .populate({ path: 'industry', select: 'name slug order' })
      .populate({ path: 'service', select: 'title slug order' })
      .populate({ path: 'level', select: 'name slug order' })
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }

  findOne(id: string): Promise<CaseStudyDocument | null> {
    return this.caseStudyModel
      .findById(id)
      .populate({ path: 'industry', select: 'name slug order' })
      .populate({ path: 'service', select: 'title slug order' })
      .populate({ path: 'level', select: 'name slug order' })
      .lean()
      .exec();
  }

  async create(createCaseStudyDto: CreateCaseStudyDto): Promise<CaseStudyDocument> {
    const createdCaseStudy = new this.caseStudyModel(createCaseStudyDto);
    return createdCaseStudy.save();
  }

  async update(id: string, updateCaseStudyDto: UpdateCaseStudyDto): Promise<CaseStudyDocument | null> {
    return this.caseStudyModel
      .findByIdAndUpdate(id, updateCaseStudyDto, { returnDocument: 'after' })
      .populate({ path: 'industry', select: 'name slug order' })
      .populate({ path: 'service', select: 'title slug order' })
      .populate({ path: 'level', select: 'name slug order' })
      .exec();
  }

  async remove(id: string): Promise<CaseStudyDocument | null> {
    return this.caseStudyModel.findByIdAndDelete(id).exec();
  }
}

function clampLimit(limit?: number) {
  if (!Number.isFinite(limit) || !limit) return DEFAULT_LIMIT;
  return Math.max(1, Math.min(MAX_LIMIT, Math.floor(limit)));
}

function clampPage(page?: number) {
  if (!Number.isFinite(page) || !page) return 1;
  return Math.max(1, Math.floor(page));
}
