import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

export enum ServiceType {
  LIVESTREAM = 'livestream',
  KOL = 'kol',
  CONTENT = 'content',
  TIKTOK = 'tiktok',
  BRANDING = 'branding',
  OTHER = 'other',
}

export enum ContactStatus {
  NEW = 'new',
  READ = 'read',
  REPLIED = 'replied',
}

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 150 })
  email: string;

  @Prop({ maxlength: 20 })
  phone: string;

  @Prop({ maxlength: 150 })
  company: string;

  @Prop({ enum: Object.values(ServiceType) })
  service: string;

  @Prop({ required: true })
  message: string;

  @Prop({ enum: Object.values(ContactStatus), default: ContactStatus.NEW })
  status: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
