import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema()
export class PageSeo {
  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  keywords: string;

  @Prop({ default: '' })
  ogImage: string;
}

export const PageSeoSchema = SchemaFactory.createForClass(PageSeo);

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

  // --- Specific Page SEO ---
  @Prop({ type: PageSeoSchema, default: {} })
  homeSeo: PageSeo;

  @Prop({ type: PageSeoSchema, default: {} })
  aboutSeo: PageSeo;

  @Prop({ type: PageSeoSchema, default: {} })
  servicesSeo: PageSeo;

  @Prop({ type: PageSeoSchema, default: {} })
  caseStudiesSeo: PageSeo;

  @Prop({ type: PageSeoSchema, default: {} })
  contactSeo: PageSeo;

  @Prop({ type: PageSeoSchema, default: {} })
  recruitmentSeo: PageSeo;

  // --- Popups ---
  @Prop({ default: false })
  popupActive: boolean;

  @Prop({ default: '' })
  popupImageUrl: string;

  @Prop({ default: '' })
  popupLinkUrl: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
