import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecruitmentService } from './recruitment.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadService } from '../upload/upload.service';

const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_CV_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

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
  findAll(@Query('limit') limit?: string, @Query('page') page?: string) {
    return this.recruitmentService.findAll({
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
    });
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
  @UseInterceptors(
    FileInterceptor('cv', {
      limits: { fileSize: MAX_CV_SIZE_BYTES },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_CV_MIME_TYPES.has(file.mimetype)) {
          return cb(new BadRequestException('Only PDF/DOC/DOCX are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
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
  findAllApplications(@Query('limit') limit?: string, @Query('page') page?: string) {
    return this.recruitmentService.findAllApplications({
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
    });
  }
}
