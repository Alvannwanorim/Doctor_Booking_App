import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreatePatientDto {
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

  @IsOptional()
  roles?: string;
}
