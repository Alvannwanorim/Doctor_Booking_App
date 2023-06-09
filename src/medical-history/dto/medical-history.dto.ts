import { IsArray, IsNotEmpty } from 'class-validator';
import { MedicalHistoryInterface } from '../interfaces/medical-history.interface';

export class MedicalHistoryDto implements MedicalHistoryInterface {
  @IsArray()
  @IsNotEmpty()
  previous_treatment: [string];

  @IsArray()
  @IsNotEmpty()
  current_medication: [string];

  @IsArray()
  @IsNotEmpty()
  drug_or_food_allergies: [string];
}
