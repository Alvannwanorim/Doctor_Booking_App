import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  DoctorInterface,
  ProfessionalInformationInterface,
} from '../interfaces/doctor.interface';
import { DOCTOR_STATUS } from '../types/doctors-status.type';

export type DoctorDocument = Doctor & Document;

class ProfessionalInformation implements ProfessionalInformationInterface {
  @Prop({ type: String, trim: true, required: true })
  category: string;

  @Prop({ type: String, trim: true, required: true })
  experience: string;

  @Prop({ type: String, trim: true, required: true })
  professional_status: string;
}
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Doctor extends Document implements DoctorInterface {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, trim: true, required: true })
  first_name: string;

  @Prop({ type: String, trim: true, required: true })
  last_name: string;

  @Prop({ type: String, trim: true, required: true, unique: true })
  email: string;

  @Prop({ type: String, trim: true, required: true, unique: true })
  phone_number: string;

  @Prop({ type: String, trim: true })
  date_of_birth: string;

  @Prop({ type: String, trim: true })
  gender: string;

  @Prop({ type: String, trim: true })
  country: string;

  @Prop({ type: String, trim: true })
  state: string;

  @Prop({ type: String, trim: true })
  address: string;

  @Prop({ type: Number, trim: true, default: 0 })
  consultation_fee: number;

  @Prop({ type: Number, trim: true, default: 0 })
  rating: number;

  @Prop({ enum: DOCTOR_STATUS, default: DOCTOR_STATUS.PENDING })
  status: DOCTOR_STATUS;

  @Prop({ type: ProfessionalInformation })
  professional_experience: ProfessionalInformation;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);

DoctorSchema.virtual('id').get(function () {
  return this._id;
});

DoctorSchema.virtual('doctorId').get(function () {
  return this._id;
});

DoctorSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
