import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLES } from '../types/user.types';
import { VERIFICATION } from '../types/verification.types';

export type UserDocument = User & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  _id: string;

  @Prop({ type: String, required: true, trim: true })
  firstName: string;

  @Prop({ type: String, required: true, trim: true })
  lastName: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  email: string;

  @Prop({ trim: true, unique: true })
  phoneNumber: string;

  @Prop({ type: String, trim: true })
  password: string;

  @Prop({ type: String, trim: true })
  dateOfBirth: string;

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
  verificationStatus: VERIFICATION;
}

export const USerSchema = SchemaFactory.createForClass(User);

USerSchema.virtual('id').get(function () {
  return this._id;
});

USerSchema.virtual('userId').get(function () {
  return this._id;
});

USerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
