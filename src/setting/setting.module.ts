import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { Setting, SettingSchema } from './schemas/setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  providers: [SettingService],
  controllers: [SettingController]
})
export class SettingModule {}
