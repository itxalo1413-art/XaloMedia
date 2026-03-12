import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel(Faq.name)
    private readonly faqModel: Model<FaqDocument>,
  ) {}

  findAll(): Promise<FaqDocument[]> {
    return this.faqModel.find({ isActive: true }).sort({ order: 1 }).exec();
  }

  findOne(id: string): Promise<FaqDocument | null> {
    return this.faqModel.findById(id).exec();
  }

  create(createFaqDto: CreateFaqDto): Promise<FaqDocument> {
    const createdFaq = new this.faqModel(createFaqDto);
    return createdFaq.save();
  }

  update(id: string, updateFaqDto: UpdateFaqDto): Promise<FaqDocument | null> {
    return this.faqModel.findByIdAndUpdate(id, updateFaqDto, { returnDocument: 'after' }).exec();
  }

  remove(id: string): Promise<FaqDocument | null> {
    return this.faqModel.findByIdAndDelete(id).exec();
  }
}
