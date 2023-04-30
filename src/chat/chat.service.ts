import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schema/chat.schema';
import mongoose, { Model } from 'mongoose';
import { Message, MessageDocument } from './schema/message.schema';
import { ChatDto } from './dto/chat.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}
  /**
   *@description create and return new chat for doctor and patient
   * @param `chatDto`
   * @returns `Chat`
   */
  public async createChat(chatDto: ChatDto) {
    const existingChat = await this.chatModel.findOne({
      members: {
        $all: [
          new mongoose.Types.ObjectId(chatDto.doctor),
          new mongoose.Types.ObjectId(chatDto.patient),
        ],
      },
    });

    if (existingChat) return existingChat;
    const chat = new this.chatModel({
      members: [
        new mongoose.Types.ObjectId(chatDto.doctor),
        new mongoose.Types.ObjectId(chatDto.patient),
      ],
    });
    await chat.save();
    return chat;
  }

  /**
   * @description deletes chat and messages associated with the chat
   * @param chat_id : string
   */
  public async deleteChat(chat_id: string) {
    const chat = await this.chatModel.findById(chat_id);
    if (!chat) throw new NotFoundException('Chat not found');
    await this.messageModel.deleteMany({ chat_id });
    await chat.remove();
    return chat;
  }

  /**
   *@description Create and return message for a given chat
   * @param messageDto
   * @returns `Message`
   */
  public async sendMessage(messageDto: MessageDto) {
    const chat = await this.chatModel.findById(messageDto.chat_id);
    if (!chat) throw new NotFoundException('Chat not found');
    const message = new this.messageModel({ ...messageDto });
    await message.save();
    return message;
  }

  /**
   *@description find and return messages in a given chat
   * @param chat_id : string
   * @returns `Message`
   */
  public async getChatMessages(chat_id: string) {
    const message = await this.messageModel.find({ chat_id });
    return message;
  }

  /**
   * @description find and delete message for a chat
   * @param message_id : string
   * @returns `Message`
   */
  public async deleteMessage(message_id: string) {
    const message = await this.messageModel.findByIdAndRemove(message_id);
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  /**
   * @description find and update the message text for a chat
   * @param message_id : string
   * @param text : string
   * @returns `Message`
   */
  public async updateMessage(message_id: string, text: string) {
    const message = await this.messageModel.findById(message_id);
    if (!message) throw new NotFoundException('Message not found');
    message.text = text;
    await message.save();
    return message;
  }

  public async getChatById(chat_id: string) {
    const chat = await this.chatModel.findById(chat_id);
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }
  public async getUserChats(_id: any) {
    const userId = new mongoose.Types.ObjectId(_id);
    const userChat = await this.chatModel.find({
      members: { $in: [userId] },
    });

    return userChat;
  }
}
