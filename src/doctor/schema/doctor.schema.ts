import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
export type DoctorDocument = Doctor & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Doctor {
  _id: string;

  @Prop({
    type: ObjectId,
    unique: true,
    required: [true, 'Provide a user id'],
    immutable: false,
  })
  userId: string;

  @Prop({ type: Date, trim: true })
  dateOfBirth: string;

  @Prop({ type: String, trim: true })
  gender: string;

  @Prop({ type: String, trim: true })
  country: string;

  @Prop({ type: String, trim: true })
  state: string;

  @Prop({ type: String, trim: true })
  address: string;

  @Prop({ type: String, trim: true })
  category: string;

  @Prop({ type: String, trim: true })
  experience: string;

  @Prop({ type: String, trim: true })
  professional_status: string;
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
