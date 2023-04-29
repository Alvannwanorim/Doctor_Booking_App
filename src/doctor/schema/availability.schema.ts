import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AvailabilityInterface } from '../interfaces/availability.interface';
import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
export type AvailabilityDocument = Availability & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Availability implements AvailabilityInterface {
  @Prop({
    type: ObjectId,
    required: [true, 'Provide doctor Id'],
  })
  doctor: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
  })
  weekday: string;
  @Prop({
    type: Array,
    default: [],
  })
  slots: [string];
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);

AvailabilitySchema.virtual('id').get(function () {
  return this._id;
});

AvailabilitySchema.virtual('doctorId').get(function () {
  return this._id;
});

AvailabilitySchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
