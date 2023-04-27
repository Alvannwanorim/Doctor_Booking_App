import { Prop } from '@nestjs/mongoose';
import { AvailabilityInterface } from '../interfaces/availability.interface';

export class Availability implements AvailabilityInterface {
  @Prop({
    type: Array,
    default: [],
  })
  Monday: [string];
  @Prop({
    type: Array,
    default: [],
  })
  Tuesday: [string];
  @Prop({
    type: Array,
    default: [],
  })
  Wednesday: [string];
  @Prop({
    type: Array,
    default: [],
  })
  Thursday: [string];
  @Prop({
    type: Array,
    default: [],
  })
  Friday: [string];
  @Prop({
    type: Array,
    default: [],
  })
  Saturday: [string];
  @Prop({
    type: Array,
    default: [],
  })
  Sunday: [string];
}
