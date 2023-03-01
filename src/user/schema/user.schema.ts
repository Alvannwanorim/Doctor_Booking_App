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

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true, trim: true, unique: true })
  password: string;

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
