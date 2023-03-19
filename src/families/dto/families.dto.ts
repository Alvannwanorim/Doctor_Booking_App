import {
  IsDateString,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { FamiliesInterface } from '../interfaces/families.interface';

export class FamiliesDto implements FamiliesInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('NG')
  phone_number: string;

  @IsDateString()
  date_of_birth: string;

  @IsString()
  @IsNotEmpty()
  relationship: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}