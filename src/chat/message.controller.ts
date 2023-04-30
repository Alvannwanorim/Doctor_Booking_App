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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MessageDto } from './dto/message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly chatService: ChatService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  public async sendMessage(@Body() messageDto: MessageDto) {
    return await this.chatService.sendMessage(messageDto);
  }

  @Get('/:chat_id')
  @UseGuards(JwtAuthGuard)
  public async getMessages(@Param('chat_id') chat_id: string) {
    return await this.chatService.getChatMessages(chat_id);
  }

  @Delete('/:message_id')
  @UseGuards(JwtAuthGuard)
  public async deleteMessage(@Param('message_id') message_id: string) {
    return await this.chatService.deleteMessage(message_id);
  }
  @Put('/:message_id')
  @UseGuards(JwtAuthGuard)
  public async updateMessage(
    @Param('message_id') message_id: string,
    @Body() messageDto: UpdateMessageDto,
  ) {
    return await this.chatService.updateMessage(message_id, messageDto.text);
  }
}
