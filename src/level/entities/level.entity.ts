import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Service } from '../../service/entities/service.entity';

export type LevelDocument = HydratedDocument<Level>;

@Schema({ timestamps: true })
export class Level {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 100, unique: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Service', required: false })
  service: Service | Types.ObjectId;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
