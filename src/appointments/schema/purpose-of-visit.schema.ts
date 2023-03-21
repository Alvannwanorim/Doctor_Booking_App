import { Prop } from '@nestjs/mongoose';
import { PurposeOfVisitInterface } from '../interfaces/purpose-of-visit.interface';

export class PurposeOfVisit implements PurposeOfVisitInterface {
  @Prop({ type: String, trim: true })
  message: string;

  @Prop({ type: String, trim: true })
  audio: string;
}
