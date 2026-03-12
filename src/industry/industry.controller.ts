import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createIndustryDto: CreateIndustryDto) {
    return this.industryService.create(createIndustryDto);
  }

  @Get()
  findAll() {
    return this.industryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.industryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndustryDto: UpdateIndustryDto) {
    return this.industryService.update(id, updateIndustryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.industryService.remove(id);
  }
}

