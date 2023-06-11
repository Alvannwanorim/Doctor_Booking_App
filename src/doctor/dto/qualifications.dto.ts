import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { QualificationsInterface } from '../interfaces/qualifications.interface';

export class QualificationsDto implements QualificationsInterface {
  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  university: string;

  @IsString()
  @IsNotEmpty()
  name_of_hospital_of_practice: string;

  @IsString()
  @IsNotEmpty()
  contact_of_hospital_of_practice: string;

  @IsString()
  @IsNotEmpty()
  country_of_hospital_of_practice: string;

  @IsString()
  @IsNotEmpty()
  state_of_hospital_of_practice: string;

  @IsString()
  @IsNotEmpty()
  license_number: string;

  @IsDateString()
  @IsNotEmpty()
  license_expiry_date: string;
}
