import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema({ timestamps: true })
export class Setting {
  @Prop({ default: 'Xalo Media' })
  siteName: string;

  @Prop({ default: '' })
  siteDescription: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  workingHours: string;

  @Prop({ default: '' })
  mapUrl: string;

  @Prop({ default: '' })
  facebook: string;

  @Prop({ default: '' })
  zalo: string;

  @Prop({ default: '' })
  tiktok: string;

  @Prop({ default: '' })
  youtube: string;

  @Prop({ default: '' })
  instagram: string;

  @Prop({ default: '' })
  defaultMetaTitle: string;

  @Prop({ default: '' })
  defaultMetaDescription: string;

  @Prop({ default: '' })
  defaultOgImage: string;

  @Prop({ default: false })
  popupActive: boolean;

  @Prop({ default: '' })
  popupImageUrl: string;

  @Prop({ default: '' })
  popupLinkUrl: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
