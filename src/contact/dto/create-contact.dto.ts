import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ServiceType } from '../entities/contact.entity';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  company?: string;

  @IsEnum(ServiceType)
  @IsOptional()
  service?: ServiceType;

  @IsString()
  @IsNotEmpty()
  message: string;
}
