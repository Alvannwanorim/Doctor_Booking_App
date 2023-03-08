import { IsEmail, IsStrongPassword } from 'class-validator';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('NG')
  phoneNumber: string;

  @IsStrongPassword()
  password: string;
}
