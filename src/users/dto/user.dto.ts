import { IsEmail, IsEnum, IsStrongPassword } from 'class-validator';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { ROLES } from '../types/user.type';

export class UserDto {
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

  @IsEnum(ROLES)
  roles: ROLES;
}
