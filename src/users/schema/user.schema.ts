import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ROLES } from '../types/user.type';
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
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  first_name: string;

  @Prop({ type: String, required: true, trim: true })
  last_name: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  email: string;

  @Prop({ type: String, trim: true })
  password: string;

  @Prop({ type: String, trim: true })
  phone_number: string;

  @Prop({ enum: ROLES, default: ROLES.PATIENT })
  roles: ROLES;

  @Prop({ enum: VERIFICATION, default: VERIFICATION.PENDING })
  verification_status: VERIFICATION;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id;
});

UserSchema.virtual('userId').get(function () {
  return this._id;
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
