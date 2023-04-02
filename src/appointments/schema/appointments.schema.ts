import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppointmentsInterface } from '../interfaces/appointments.interface';
import mongoose, { Document } from 'mongoose';
import { PurposeOfVisit } from './purpose-of-visit.schema';
import { APPOINTMENTS_STATUS } from '../types/appointments-status.type';

const { ObjectId } = mongoose.Schema.Types;
export type AppointmentsDocument = Appointments & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Appointments implements AppointmentsInterface {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: ObjectId, required: [true, "Provide Patient's Id"] })
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({ type: ObjectId, required: [true, "Provide Doctor's Id"] })
  doctor: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: PurposeOfVisit })
  purpose_of_visit: PurposeOfVisit;

  @Prop({ enum: APPOINTMENTS_STATUS, default: APPOINTMENTS_STATUS.PENDING })
  status: APPOINTMENTS_STATUS;
}

export const AppointmentsSchema = SchemaFactory.createForClass(Appointments);

AppointmentsSchema.virtual('id').get(function () {
  return this._id;
});
AppointmentsSchema.virtual('appointmentId').get(function () {
  return this._id;
});

AppointmentsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
