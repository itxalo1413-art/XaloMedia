import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IndustryDocument = HydratedDocument<Industry>;

@Schema({ timestamps: true })
export class Industry {
  @Prop({ required: true, maxlength: 150 })
  name: string;

  @Prop({ required: true, maxlength: 100, unique: true })
  slug: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const IndustrySchema = SchemaFactory.createForClass(Industry);
