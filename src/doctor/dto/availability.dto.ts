import { IsEnum, IsString } from 'class-validator';
import { WEEK_DAYS } from '../types/week-days.type';

export class AvailabilityDto {
  @IsEnum(WEEK_DAYS)
  week_day: WEEK_DAYS;

  @IsString()
  time: string;
}
