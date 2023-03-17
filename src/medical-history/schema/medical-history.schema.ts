import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MedicalHistoryInterface } from '../interfaces/medical-history.interface';
export type MedicalHistoryDocument = MedicalHistory & Document;
const { ObjectId } = mongoose.Schema.Types;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class MedicalHistory implements MedicalHistoryInterface {
  _id: string;

  @Prop({
    type: ObjectId,
    required: [true, 'Provide a user id'],
    immutable: false,
    unique: true,
  })
  user: string;

  @Prop({
    type: String,
    trim: true,
  })
  previousTreatment: string;

  @Prop({
    type: String,
    trim: true,
  })
  currentMedication: string;

  @Prop({
    type: String,
    trim: true,
  })
  drugOrFoodAllergies: string;
}

export const MedicalHistorySchema =
  SchemaFactory.createForClass(MedicalHistory);

MedicalHistorySchema.virtual('id').get(function () {
  return this._id;
});
MedicalHistorySchema.virtual('medicalHistoryId').get(function () {
  return this._id;
});

MedicalHistorySchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
