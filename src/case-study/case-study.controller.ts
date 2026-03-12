import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CaseStudyService } from './case-study.service';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('case-studies')
export class CaseStudyController {
  constructor(private readonly caseStudyService: CaseStudyService) {}

  @Get()
  findAll(@Query('industry') industry?: string) {
    return this.caseStudyService.findAll(industry);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseStudyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCaseStudyDto: CreateCaseStudyDto) {
    return this.caseStudyService.create(createCaseStudyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseStudyDto: UpdateCaseStudyDto) {
    return this.caseStudyService.update(id, updateCaseStudyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseStudyService.remove(id);
  }
}

