import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
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

  @Prop({ type: Array, required: [true, 'Provide patient Id'] })
  members: [mongoose.Schema.Types.ObjectId];
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
