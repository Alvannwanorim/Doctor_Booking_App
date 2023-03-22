import { IsEnum } from 'class-validator';
import { DOCTOR_STATUS } from '../types/doctors-status.type';

export class UpdateDoctorStatusDto {
  @IsEnum(DOCTOR_STATUS)
  status: DOCTOR_STATUS;
}
