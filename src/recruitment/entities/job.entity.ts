import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, maxlength: 150 })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [String] })
  requirements: string[];

  @Prop({ required: true, maxlength: 100 })
  salary: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
