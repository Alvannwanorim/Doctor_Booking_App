import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PatientInterface } from '../interfaces/patient.interface';
import { ROLES } from '../types/patient.types';
import { VERIFICATION } from '../types/verification.types';
import { MedicalHistory } from './medical-history.schema';
import { Vitals } from './vitals.schema';

export type PatientDocument = Patient & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Patient extends Document implements PatientInterface {
  _id: string;

  @Prop({ type: String, required: true, trim: true })
  first_name: string;

  @Prop({ type: String, required: true, trim: true })
  last_name: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  email: string;

  @Prop({ trim: true, unique: true })
  phone_number: string;

  @Prop({ type: String, trim: true })
  password: string;

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

  @Prop({ enum: ROLES, default: ROLES.PATIENT })
  roles: ROLES;
  @Prop({ enum: VERIFICATION, default: VERIFICATION.PENDING })
  verification_status: VERIFICATION;

  @Prop({ type: MedicalHistory })
  medical_history: MedicalHistory;

  @Prop({ type: Vitals })
  vitals: Vitals;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.virtual('id').get(function () {
  return this._id;
});

PatientSchema.virtual('patientId').get(function () {
  return this._id;
});

PatientSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
