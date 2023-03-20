import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { APPOINTMENTS_STATUS } from '../types/appointments-status.type';

export class AppointmentsDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  patient: string;

  @IsString()
  @IsNotEmpty()
  doctor: string;

  @IsEnum(APPOINTMENTS_STATUS)
  status: APPOINTMENTS_STATUS;

  @IsString()
  @IsNotEmpty()
  time: string;
}
