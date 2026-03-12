import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level, LevelDocument } from './entities/level.entity';

@Injectable()
export class LevelService {
  constructor(@InjectModel(Level.name) private levelModel: Model<LevelDocument>) {}

  async create(createLevelDto: CreateLevelDto) {
    const createdLevel = new this.levelModel(createLevelDto);
    return await createdLevel.save();
  }

  async findAll() {
    return await this.levelModel.find().populate('service').sort({ order: 1 }).exec();
  }

  async findOne(id: string) {
    const level = await this.levelModel.findById(id).populate('service').exec();
    if (!level) {
      throw new NotFoundException(`Level #${id} not found`);
    }
    return level;
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    const existingLevel = await this.levelModel.findByIdAndUpdate(id, updateLevelDto, { returnDocument: 'after' }).exec();
    if (!existingLevel) {
      throw new NotFoundException(`Level #${id} not found`);
    }
    return existingLevel;
  }

  async remove(id: string) {
    const deletedLevel = await this.levelModel.findByIdAndDelete(id).exec();
    if (!deletedLevel) {
      throw new NotFoundException(`Level #${id} not found`);
    }
    return deletedLevel;
  }
}
