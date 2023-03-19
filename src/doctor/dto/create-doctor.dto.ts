import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { DoctorInterface } from '../interfaces/doctor.interface';
export class ProfessionalExperienceDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  professional_status: string;
}
export class CreateDoctorDto implements DoctorInterface {
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('NG')
  phone_number: string;

  @IsStrongPassword()
  password: string;

  @IsDateString()
  date_of_birth: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => ProfessionalExperienceDto)
  professional_experience: ProfessionalExperienceDto;
}
