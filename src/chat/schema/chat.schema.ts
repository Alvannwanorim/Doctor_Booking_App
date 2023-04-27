import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
export type ChatDocument = Chat & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Chat {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: ObjectId, required: [true, 'Provide patient Id'] })
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({ type: ObjectId, required: [true, 'Provide doctor Id'] })
  doctor: mongoose.Schema.Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
ChatSchema.virtual('id').get(function () {
  return this._id;
});

ChatSchema.virtual('chatId').get(function () {
  return this._id;
});

ChatSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
