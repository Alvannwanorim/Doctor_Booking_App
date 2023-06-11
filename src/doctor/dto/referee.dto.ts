import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { RefereeInterface } from '../interfaces/referee.interface';

export class RefereeDto implements RefereeInterface {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('NG')
  phone: string;

  @IsString()
  @IsNotEmpty()
  relationship_to_you: string;
}
