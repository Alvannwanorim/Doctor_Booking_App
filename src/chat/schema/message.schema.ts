import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
export type ChatDocument = Message & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Message {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: ObjectId,
    required: [true, 'Provide Chat Id'],
  })
  chat_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: ObjectId,
    required: [true, 'Provide Chat Id'],
  })
  sender_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.virtual('id').get(function () {
  return this._id;
});

MessageSchema.virtual('messageId').get(function () {
  return this._id;
});

MessageSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj._v;
  delete obj['updatedAt'];
  delete obj['createdAt'];
  return obj;
};
