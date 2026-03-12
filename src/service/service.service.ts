import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  findAll(query: any = { isActive: true }): Promise<ServiceDocument[]> {
    return this.serviceModel.find(query).sort({ order: 1 }).populate('industry').exec();
  }

  findOne(id: string): Promise<ServiceDocument | null> {
    return this.serviceModel.findById(id).exec();
  }

  create(createServiceDto: CreateServiceDto): Promise<ServiceDocument> {
    const data = { ...createServiceDto };
    if (data.industry === '') {
      delete data.industry;
    }
    const createdService = new this.serviceModel(data);
    return createdService.save();
  }

  update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceDocument | null> {
    const data = { ...updateServiceDto };
    if (data.industry === '') {
      data.industry = null as any;
    }
    return this.serviceModel.findByIdAndUpdate(id, data, { returnDocument: 'after' }).exec();
  }

  remove(id: string): Promise<ServiceDocument | null> {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}
