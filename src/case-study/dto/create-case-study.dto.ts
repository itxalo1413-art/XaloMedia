import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray, IsDateString } from 'class-validator';

export class CreateCaseStudyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imgSrc: string;

  @IsString()
  @IsNotEmpty()
  metric: string;

  @IsString()
  @IsNotEmpty()
  metricLabel: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  service?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  publishDate?: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
