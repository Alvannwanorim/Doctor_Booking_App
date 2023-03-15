import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DeliveryAddressesInterface } from '../interfaces/addresses.interface';

export type DeliveryAddressDocument = DeliveryAddress & Document;
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
export class DeliveryAddress implements DeliveryAddressesInterface {
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
  address: string;
}

export const DeliveryAddressSchema =
  SchemaFactory.createForClass(DeliveryAddress);

DeliveryAddressSchema.virtual('id').get(function () {
  return this._id;
});
DeliveryAddressSchema.virtual('addressesId').get(function () {
  return this._id;
});

DeliveryAddressSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
