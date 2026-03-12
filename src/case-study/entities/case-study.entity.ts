import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Service } from '../../service/entities/service.entity';
import { Industry } from '../../industry/entities/industry.entity';
import { Level } from '../../level/entities/level.entity';

export type CaseStudyDocument = HydratedDocument<CaseStudy>;

@Schema({ timestamps: true })
export class CaseStudy {
  @Prop({ required: true, maxlength: 200 })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: () => new Date() })
  publishDate: Date;

  @Prop({ required: false, maxlength: 500 })
  introduction: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: true, maxlength: 200 })
  imgSrc: string;

  @Prop({ required: true, maxlength: 50 })
  metric: string;

  @Prop({ required: true, maxlength: 100 })
  metricLabel: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'Service', required: false })
  service: Service | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Industry', required: false })
  industry: Industry | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Level', required: false })
  level: Level | Types.ObjectId;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const CaseStudySchema = SchemaFactory.createForClass(CaseStudy);
