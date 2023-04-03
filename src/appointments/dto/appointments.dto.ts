import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { APPOINTMENTS_STATUS } from '../types/appointments-status.type';

export class AppointmentsDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  doctor: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}
export class UpdateAppointmentsDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  doctor: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}
export class UpdateAppointmentStatusDto {
  @IsEnum(APPOINTMENTS_STATUS)
  status: APPOINTMENTS_STATUS;
}
