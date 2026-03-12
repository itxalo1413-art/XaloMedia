import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('settings')
  async getSettings() {
    const settings = await this.settingService.getSettings();
    return { success: true, data: settings };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/settings')
  async updateSettings(@Body() updateSettingDto: UpdateSettingDto) {
    const settings = await this.settingService.updateSettings(updateSettingDto);
    return { success: true, data: settings };
  }
}

