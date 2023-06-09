import {
  Controller,
  Req,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { BankDetailsService } from './bank-details.service';
import { BankDetailsDto } from './dto/bank-details.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('bank-details')
export class BankDetailsController {
  constructor(private readonly bankDetailsService: BankDetailsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createBankDetails(@Req() req, @Body() bankDetailsDto: BankDetailsDto) {
    return await this.bankDetailsService.create(req.user._id, bankDetailsDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllBankDetails() {
    return await this.bankDetailsService.findAll();
  }

  @Get('user-all')
  @UseGuards(JwtAuthGuard)
  async getUserBankDetails(@Req() req) {
    return await this.bankDetailsService.findAllUserBankDetails(req.user._id);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getOneUserBankDetails(@Req() req) {
    return await this.bankDetailsService.getOneUserBankDetails(req.user._id);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async deleteBankDetails(@Req() req, @Param('bank_id') bank_id: string) {
    return await this.bankDetailsService.deleteBankDetails(
      req.user._id,
      bank_id,
    );
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  async removeBankDetails(@Param('bank_id') bank_id: string) {
    return await this.bankDetailsService.removeBankDetails(bank_id);
  }
}
