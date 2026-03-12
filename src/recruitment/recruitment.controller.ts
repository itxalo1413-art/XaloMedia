import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecruitmentService } from './recruitment.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadService } from '../upload/upload.service';

@Controller('recruitment')
export class RecruitmentController {
  constructor(
    private readonly recruitmentService: RecruitmentService,
    private readonly uploadService: UploadService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.recruitmentService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.recruitmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.recruitmentService.update(id, updateJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentService.remove(id);
  }

  // ── Public: Submit Job Application ──────────────────────────────
  @Post(':id/apply')
  @UseInterceptors(FileInterceptor('cv'))
  async apply(
    @Param('id') jobId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { applicantName: string; applicantEmail: string; applicantPhone?: string; coverLetter?: string },
  ) {
    if (!file) {
      throw new BadRequestException('CV file is required');
    }

    // Upload the CV to Cloudinary (raw resource type for PDFs)
    const uploadResult = await this.uploadService.uploadFile(file);

    return this.recruitmentService.submitApplication({
      jobId,
      applicantName: body.applicantName,
      applicantEmail: body.applicantEmail,
      applicantPhone: body.applicantPhone,
      coverLetter: body.coverLetter,
      cvUrl: uploadResult.secure_url,
    });
  }

  // ── Admin: View all applications ───────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Get('applications/all')
  findAllApplications() {
    return this.recruitmentService.findAllApplications();
  }
}
