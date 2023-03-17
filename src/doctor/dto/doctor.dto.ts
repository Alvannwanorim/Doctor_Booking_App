import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class DoctorDto {
  @IsDateString()
  dateOfBirth: string;

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
