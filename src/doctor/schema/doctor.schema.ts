import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DoctorInterface } from '../interfaces/doctor.interface';
import { DOCTOR_STATUS } from '../types/doctors-status.type';
import { ProfessionalInformationInterface } from '../interfaces/professional-information.interface';
import { QualificationsInterface } from '../interfaces/qualifications.interface';
import { DocumentsInterface } from '../interfaces/documents.interface';

export type DoctorDocument = Doctor & Document;

const { ObjectId } = mongoose.Schema.Types;

class ProfessionalInformation implements ProfessionalInformationInterface {
  @Prop({ type: String, trim: true, required: true })
  category: string;

  @Prop({ type: String, trim: true, required: true })
  experience: string;

  @Prop({ type: String, trim: true, required: true })
  professional_status: string;

  @Prop({ type: String, trim: true, required: true })
  specialization: string;

  @Prop({ type: String })
  bio: string;

  @Prop({ type: Array })
  languages: [string];
}
class Qualifications implements QualificationsInterface {
  @Prop({ type: String, required: true })
  degree: string;

  @Prop({ type: String, required: true })
  university: string;

  @Prop({ type: String, required: true })
  name_of_hospital_of_practice: string;

  @Prop({ type: String, required: true })
  contact_of_hospital_of_practice: string;

  @Prop({ type: String, required: true })
  country_of_hospital_of_practice: string;

  @Prop({ type: String, required: true })
  state_of_hospital_of_practice: string;

  @Prop({ type: String, required: true })
  license_number: string;

  @Prop({ type: String, required: true })
  license_expiry_date: string;
}

class Documents implements DocumentsInterface {
  @Prop({ type: String })
  professional_photograph: string;

  @Prop({ type: String })
  id_card: string;

  @Prop({ type: String })
  degree_certificate: string;

  @Prop({ type: String })
  practice_license: string;

  @Prop({ type: String })
  nysc_certificate: string;

  @Prop({ type: String })
  signature: string;
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

  @Prop({ type: ObjectId, required: [true, 'Provide user Id'] })
  userId: mongoose.Schema.Types.ObjectId;

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

  @Prop({ type: String })
  number_of_patients: string;

  @Prop({ type: Number, trim: true, default: 0 })
  consultation_fee: number;

  @Prop({ type: Number, trim: true, default: 0 })
  rating: number;

  @Prop({ enum: DOCTOR_STATUS, default: DOCTOR_STATUS.PENDING })
  status: DOCTOR_STATUS;

  @Prop({ type: ProfessionalInformation })
  professional_experience: ProfessionalInformation;

  @Prop({ type: Qualifications })
  qualifications: Qualifications;

  @Prop({ type: Documents })
  documents: Documents;
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
