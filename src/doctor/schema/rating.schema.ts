import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
export type RatingDocument = Rating & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Rating {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: ObjectId,
    required: [true, 'Provide doctor Id'],
    unique: true,
  })
  doctor: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: ObjectId,
    required: [true, 'Provide doctor Id'],
  })
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
  })
  rating: number;

  @Prop({
    type: String,
  })
  message: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.virtual('id').get(function () {
  return this._id;
});

RatingSchema.virtual('ratingId').get(function () {
  return this._id;
});

RatingSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
