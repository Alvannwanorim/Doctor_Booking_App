import { IsNotEmpty, IsString } from 'class-validator';
import { MedicalHistoryInterface } from '../interfaces/medical-history.interface';

export class MedicalHistoryDto implements MedicalHistoryInterface {
  @IsString()
  @IsNotEmpty()
  previous_treatment: string;

  @IsString()
  @IsNotEmpty()
  current_medication: string;

  @IsString()
  @IsNotEmpty()
  drug_or_food_allergies: string;
}
