import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partner, PartnerDocument } from './entities/partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name)
    private readonly partnerModel: Model<PartnerDocument>,
  ) {}

  findAll(): Promise<PartnerDocument[]> {
    return this.partnerModel.find().populate('caseStudyId').sort({ order: 1 }).exec();
  }

  findOne(id: string): Promise<PartnerDocument | null> {
    return this.partnerModel.findById(id).exec();
  }

  create(createPartnerDto: CreatePartnerDto): Promise<PartnerDocument> {
    const createdPartner = new this.partnerModel(createPartnerDto);
    return createdPartner.save();
  }

  update(id: string, updatePartnerDto: UpdatePartnerDto): Promise<PartnerDocument | null> {
    return this.partnerModel.findByIdAndUpdate(id, updatePartnerDto, { returnDocument: 'after' }).exec();
  }

  remove(id: string): Promise<PartnerDocument | null> {
    return this.partnerModel.findByIdAndDelete(id).exec();
  }
}
