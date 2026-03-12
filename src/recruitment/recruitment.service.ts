import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './entities/job.entity';
import { JobApplication, JobApplicationDocument } from './entities/job-application.entity';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(JobApplication.name) private applicationModel: Model<JobApplicationDocument>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const existingJob = await this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { returnDocument: 'after' })
      .exec();
    
    if (!existingJob) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return existingJob;
  }

  async remove(id: string): Promise<Job> {
    const deletedJob = await this.jobModel.findByIdAndDelete(id).exec();
    if (!deletedJob) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return deletedJob;
  }

  // ── Job Applications ──────────────────────────────────────────────
  async submitApplication(data: {
    jobId: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone?: string;
    coverLetter?: string;
    cvUrl: string;
  }): Promise<JobApplication> {
    // Verify the job exists
    await this.findOne(data.jobId);
    const application = new this.applicationModel(data);
    return application.save();
  }

  async findAllApplications(): Promise<JobApplicationDocument[]> {
    return this.applicationModel.find().sort({ createdAt: -1 }).populate('jobId').exec();
  }
}
