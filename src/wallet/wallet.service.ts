import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { WalletTopUpDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    private userService: UsersService,
  ) {}
  public async createWallet(_id: any) {
    const user = await this.userService.getUserById(_id);
    if (!user) throw new NotFoundException('user not found');
    const wallet = new this.walletModel({
      userId: new mongoose.Types.ObjectId(_id),
    });
    await wallet.save();
    return wallet;
  }

  public async topUpWallet({ amount, wallet_id }: WalletTopUpDto, _id: any) {
    const user = await this.userService.getUserById(_id);
    if (!user) throw new NotFoundException('user not found');
    // verify transaction from payment gateway

    const wallet = await this.walletModel.findByIdAndUpdate(
      wallet_id,
      {
        $inc: { wallet_balance: amount, overall_payment: amount },
      },
      { new: true },
    );
    if (!wallet) throw new NotFoundException('wallet not found');
    return wallet;
  }
}
