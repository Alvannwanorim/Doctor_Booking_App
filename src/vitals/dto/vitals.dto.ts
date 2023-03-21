import { Optional } from '@nestjs/common/decorators';
import { IsNotEmpty, IsString } from 'class-validator';
import { VitalsInterface } from '../interfaces/vitals.interface';

export class VitalsDto implements VitalsInterface {
  @IsString()
  @IsNotEmpty()
  height: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @Optional()
  blood_sugar: string;

  @Optional()
  blood_pressure: string;
}
