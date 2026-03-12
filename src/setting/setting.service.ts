import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/setting.schema';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
  ) {}

  async getSettings(): Promise<Setting> {
    let setting = await this.settingModel.findOne().exec();
    if (!setting) {
      setting = await this.settingModel.create({});
    }
    return setting;
  }

  async updateSettings(updateSettingDto: UpdateSettingDto): Promise<Setting> {
    let setting = await this.settingModel.findOne().exec();
    if (!setting) {
      setting = new this.settingModel(updateSettingDto);
      return setting.save();
    }
    
    Object.assign(setting, updateSettingDto);
    return setting.save();
  }
}
