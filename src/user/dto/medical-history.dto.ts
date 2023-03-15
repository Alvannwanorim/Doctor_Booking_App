import { IsNotEmpty, IsString } from 'class-validator';
import { MedicalHistoryInterface } from '../interfaces/medical-history.interface';

export class MedicalHistoryDto implements MedicalHistoryInterface {
  @IsString()
  @IsNotEmpty()
  previousTreatment: string;

  @IsString()
  @IsNotEmpty()
  currentMedication: string;

  @IsString()
  @IsNotEmpty()
  drugOrFoodAllergies: string;
}
