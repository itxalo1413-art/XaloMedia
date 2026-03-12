import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { Industry, IndustryDocument } from './entities/industry.entity';

@Injectable()
export class IndustryService {
  constructor(@InjectModel(Industry.name) private industryModel: Model<IndustryDocument>) {}
  async create(createIndustryDto: CreateIndustryDto) {
    const createdIndustry = new this.industryModel(createIndustryDto);
    return createdIndustry.save();
  }

  async findAll() {
    return this.industryModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string) {
    const industry = await this.industryModel.findById(id).exec();
    if (!industry) {
      throw new NotFoundException(`Industry #${id} not found`);
    }
    return industry;
  }

  async update(id: string, updateIndustryDto: UpdateIndustryDto) {
    const existingIndustry = await this.industryModel.findByIdAndUpdate(id, updateIndustryDto, { returnDocument: 'after' }).exec();
    if (!existingIndustry) {
      throw new NotFoundException(`Industry #${id} not found`);
    }
    return existingIndustry;
  }

  async remove(id: string) {
    const deletedIndustry = await this.industryModel.findByIdAndDelete(id).exec();
    if (!deletedIndustry) {
      throw new NotFoundException(`Industry #${id} not found`);
    }
    return deletedIndustry;
  }
}
