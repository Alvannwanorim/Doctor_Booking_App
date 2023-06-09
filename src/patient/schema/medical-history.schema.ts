import { Prop } from '@nestjs/mongoose';
import { MedicalHistoryInterface } from 'src/medical-history/interfaces/medical-history.interface';

export class MedicalHistory implements MedicalHistoryInterface {
  @Prop({
    type: Array,
    trim: true,
  })
  previous_treatment: [string];

  @Prop({
    type: Array,
    trim: true,
  })
  current_medication: [string];

  @Prop({
    type: Array,
    trim: true,
  })
  drug_or_food_allergies: [string];
}
