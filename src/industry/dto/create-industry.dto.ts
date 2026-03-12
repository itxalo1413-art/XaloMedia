import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateIndustryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
