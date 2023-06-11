import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WalletInterface } from '../types/wallet.interface';
import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
export type WalletDocument = Wallet & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Wallet implements WalletInterface {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: ObjectId,
    required: [true, 'Please provide userId'],
    unique: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Number,
    default: 0,
  })
  wallet_balance: number;

  @Prop({
    type: Number,
    default: 0,
  })
  incoming_balance: number;

  @Prop({
    type: Number,
    default: 0,
  })
  outgoing_balance: number;

  @Prop({
    type: Number,
    default: 0,
  })
  overall_payment: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

WalletSchema.virtual('id').get(function () {
  return this._id;
});

WalletSchema.virtual('walletId').get(function () {
  return this._id;
});

WalletSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
