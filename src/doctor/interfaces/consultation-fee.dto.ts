import { IsNumber, IsPositive, Min } from 'class-validator';

export class ConsultationFeeDto {
  @IsNumber()
  @Min(1000)
  @IsPositive()
  consultation_fee: number;
}
