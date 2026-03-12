import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true, maxlength: 150 })
  title: string;

  @Prop({ required: true, maxlength: 100, unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  details?: string;

  @Prop({ type: [String], required: false, default: [] })
  highlights?: string[];

  @Prop({ required: true, maxlength: 200 })
  image: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
  
  @Prop({ type: Types.ObjectId, ref: 'Industry', required: false })
  industry?: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
