import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdatePatientDto {
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsPhoneNumber('NG')
  phone_number: string;

  @IsEmail()
  email: string;

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
}
