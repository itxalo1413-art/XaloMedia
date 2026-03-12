import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  siteName?: string;

  @IsOptional()
  @IsString()
  siteDescription?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  workingHours?: string;

  @IsOptional()
  @IsString()
  mapUrl?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  zalo?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  defaultMetaTitle?: string;

  @IsOptional()
  @IsString()
  defaultMetaDescription?: string;

  @IsOptional()
  @IsString()
  defaultOgImage?: string;

  @IsOptional()
  @IsBoolean()
  popupActive?: boolean;

  @IsOptional()
  @IsString()
  popupImageUrl?: string;

  @IsOptional()
  @IsString()
  popupLinkUrl?: string;
}
