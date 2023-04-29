import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createChat(@Body() chatDto: ChatDto) {
    return await this.chatService.createChat(chatDto);
  }

  @Delete('/:chat_id')
  @UseGuards(JwtAuthGuard)
  public async deleteChat(@Param('chat_id') chat_id: string) {
    return await this.chatService.deleteChat(chat_id);
  }

  @Post('message')
  @UseGuards(JwtAuthGuard)
  public async sendMessage(@Body() messageDto: MessageDto) {
    return await this.chatService.sendMessage(messageDto);
  }

  @Get('message/:chat_id')
  @UseGuards(JwtAuthGuard)
  public async getMessages(@Param('chat_id') chat_id: string) {
    return await this.chatService.getChatMessages(chat_id);
  }

  @Delete('message/:message_id')
  @UseGuards(JwtAuthGuard)
  public async deleteMessage(@Param('message_id') message_id: string) {
    return await this.chatService.deleteMessage(message_id);
  }
  @Put('message')
  @UseGuards(JwtAuthGuard)
  public async updateMessage(
    @Param('message_id') message_id: string,
    @Body() messageDto: UpdateMessageDto,
  ) {
    return await this.chatService.updateMessage(
      messageDto.message_id,
      messageDto.text,
    );
  }
}
