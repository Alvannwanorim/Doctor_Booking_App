import { IsEmail, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
