import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

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
  @Get('')
  @UseGuards(JwtAuthGuard)
  public async getUserChats(@Req() req) {
    return await this.chatService.getUserChats(req.user._id);
  }
  @Get('/:chat_id')
  @UseGuards(JwtAuthGuard)
  public async getChatById(@Param('chat_id') chat_id: string) {
    return await this.chatService.getChatById(chat_id);
  }
}
