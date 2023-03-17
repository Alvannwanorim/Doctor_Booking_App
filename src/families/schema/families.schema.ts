import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { FamiliesInterface } from '../interfaces/families.interface';

export type FamiliesDocument = Families & Document;
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
export class Families implements FamiliesInterface {
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
  name: string;

  @Prop({
    type: String,
    trim: true,
  })
  dateOfBirth: string;

  @Prop({
    type: String,
    trim: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    trim: true,
  })
  gender: string;

  @Prop({
    type: String,
    trim: true,
  })
  relationship: string;
}

export const FamiliesSchema = SchemaFactory.createForClass(Families);

FamiliesSchema.virtual('id').get(function () {
  return this._id;
});
FamiliesSchema.virtual('familiesId').get(function () {
  return this._id;
});

FamiliesSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
