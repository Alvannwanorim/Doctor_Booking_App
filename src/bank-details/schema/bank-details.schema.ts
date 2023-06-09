import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
export type BankDetailsDocument = BankDetails & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class BankDetails {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: ObjectId,
    required: [true, 'Please provide a user id'],
    immutable: false,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
  })
  bank_name: string;

  @Prop({
    type: String,
  })
  bank_icon: string;

  @Prop({
    type: String,
    required: [true, 'Please provide an account name'],
  })
  account_name: string;

  @Prop({
    type: String,
    required: [true, 'Please provide an account Number'],
  })
  account_number: string;

  @Prop({
    type: String,
    required: [true, 'Please provide a bank code'],
  })
  bank_code: string;
}

export const BankDetailsSchema = SchemaFactory.createForClass(BankDetails);
BankDetailsSchema.virtual('id').get(function () {
  return this._id;
});

BankDetailsSchema.virtual('bankDetailsId').get(function () {
  return this._id;
});
BankDetailsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  delete obj['updatedAt'];
  return obj;
};
