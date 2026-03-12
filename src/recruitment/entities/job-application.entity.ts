import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type JobApplicationDocument = HydratedDocument<JobApplication>;

@Schema({ timestamps: true })
export class JobApplication {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  jobId: Types.ObjectId;

  @Prop({ required: true })
  applicantName: string;

  @Prop({ required: true })
  applicantEmail: string;

  @Prop()
  applicantPhone: string;

  @Prop()
  coverLetter: string;

  @Prop({ required: true })
  cvUrl: string;

  @Prop({ default: 'new' })
  status: string;
}

export const JobApplicationSchema = SchemaFactory.createForClass(JobApplication);
