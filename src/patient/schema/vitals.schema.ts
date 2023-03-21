import { Prop } from '@nestjs/mongoose';
import { VitalsInterface } from 'src/vitals/interfaces/vitals.interface';

export class Vitals implements VitalsInterface {
  @Prop({
    type: String,
    trim: true,
  })
  height: string;

  @Prop({
    type: String,
    trim: true,
  })
  weight: string;

  @Prop({
    type: String,
    trim: true,
  })
  blood_sugar: string;

  @Prop({
    type: String,
    trim: true,
  })
  blood_pressure: string;
}
