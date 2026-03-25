import { IsOptional, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PageSeoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;
}

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
  @ValidateNested()
  @Type(() => PageSeoDto)
  homeSeo?: PageSeoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PageSeoDto)
  aboutSeo?: PageSeoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PageSeoDto)
  servicesSeo?: PageSeoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PageSeoDto)
  caseStudiesSeo?: PageSeoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PageSeoDto)
  contactSeo?: PageSeoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PageSeoDto)
  recruitmentSeo?: PageSeoDto;

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
