import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { RefereeInterface } from '../interfaces/referee.interface';

const { ObjectId } = mongoose.Schema.Types;
export type RefereeDocument = Referee & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Referee implements RefereeInterface {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: ObjectId,
    required: [true, 'Provide doctor Id'],
  })
  doctor: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
  })
  last_name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
  })
  relationship_to_you: string;
}

export const RefereeSchema = SchemaFactory.createForClass(Referee);

RefereeSchema.virtual('id').get(function () {
  return this._id;
});

RefereeSchema.virtual('refereeId').get(function () {
  return this._id;
});

RefereeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
