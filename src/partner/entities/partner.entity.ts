import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartnerDocument = HydratedDocument<Partner>;

@Schema({ timestamps: true })
export class Partner {
  @Prop({ required: true, maxlength: 150 })
  name: string;

  @Prop({ required: true, maxlength: 200 })
  logo: string;

  @Prop({ required: true, maxlength: 100 })
  category: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: 'ObjectId', ref: 'CaseStudy', default: null })
  caseStudyId: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
