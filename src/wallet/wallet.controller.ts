import { Controller, Post, Put, Req, UseGuards, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { WalletTopUpDto } from './dto/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createWallet(@Req() req) {
    return await this.walletService.createWallet(req.user._id);
  }
  @Put('top-up')
  @UseGuards(JwtAuthGuard)
  public async topUpWallet(@Body() walletTopUpDto: WalletTopUpDto, @Req() req) {
    return await this.walletService.topUpWallet(walletTopUpDto, req.user._id);
  }
}
