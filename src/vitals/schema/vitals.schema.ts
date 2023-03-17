import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { VitalsInterface } from '../interfaces/vitals.interface';
export type VitalsDocument = Vitals & Document;
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
export class Vitals implements VitalsInterface {
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
  bloodSugar: string;
}

export const VitalsSchema = SchemaFactory.createForClass(Vitals);

VitalsSchema.virtual('id').get(function () {
  return this._id;
});
VitalsSchema.virtual('vitalsId').get(function () {
  return this._id;
});

VitalsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
