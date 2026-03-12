import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateLevelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  service?: string; // ObjectId of Service

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
