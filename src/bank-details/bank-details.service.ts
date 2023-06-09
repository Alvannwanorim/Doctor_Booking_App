import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BankDetailsDto } from './dto/bank-details.dto';

import axios from 'axios';
import { VerifyBankDetailsDto } from './dto/verify-bank-details.dto';
import { BankDetails, BankDetailsDocument } from './schema/bank-details.schema';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class BankDetailsService {
  constructor(
    @InjectModel(BankDetails.name)
    private bankDetailsModel: Model<BankDetailsDocument>,
    private userService: UsersService,
  ) {}

  async getOneUserBankDetails(id: any) {
    const userBankDetails = await this.bankDetailsModel.findOne({ userId: id });
    if (userBankDetails) return userBankDetails;
  }
  async findUser(id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) return false;
    return true;
  }
  public async verifyBankDetails(verifyBankDetailsDto: VerifyBankDetailsDto) {
    const { account_number, bank_code } = verifyBankDetailsDto;

    const url = `${process.env.PAYSTACK_PAYMENT_API}/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_API_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      // console.log(error);

      const { data } = error.response;
      const message = data.message || 'error validating transaction';
      throw new NotFoundException(message);
    }
  }

  async create(id: string, bankDetailsDto: BankDetailsDto) {
    const findBankDetails = await this.bankDetailsModel.findOne({
      account_number: bankDetailsDto.account_number,
    });
    if (findBankDetails)
      throw new BadRequestException('bank details already exist');

    // const paymentDto: VerifyBankDetailsDto = {
    //   account_number: bankDetailsDto.account_number,
    //   bank_code: bankDetailsDto.bank_code,
    // };

    // const verifiedBankDetails = await this.verifyBankDetails(paymentDto);
    const createdBankDetails = new this.bankDetailsModel({
      userId: new mongoose.Types.ObjectId(id),
      bank_name: bankDetailsDto.bank_name,
      account_name: bankDetailsDto.account_name,
      account_number: bankDetailsDto.account_number,
      bank_code: bankDetailsDto.bank_code,
    });

    await createdBankDetails.save();
    return createdBankDetails;
  }

  async deleteBankDetails(id: string, bank_id: string) {
    const bankDetails = await this.bankDetailsModel.findById(bank_id);
    if (!bankDetails)
      throw new NotFoundException('Bank Details not found for this user');
    if (id.toString() !== bankDetails.userId.toString())
      throw new UnauthorizedException('User not authorized');

    await bankDetails.remove();

    return bankDetails;
  }
  async removeBankDetails(bank_id: string) {
    const bankDetails = await this.bankDetailsModel.findById(bank_id);
    if (!bankDetails) throw new NotFoundException('Bank Details not found');
    await bankDetails.remove();
    return bankDetails;
  }
  async findOneBankDetails(id: any, bank_id: any) {
    const bankDetails = await this.bankDetailsModel.findOne({
      _id: new mongoose.Types.ObjectId(bank_id),
      userId: new mongoose.Types.ObjectId(id),
    });
    if (!bankDetails)
      throw new NotFoundException('Bank Details not found for this user');

    return bankDetails;
  }
  async findAllBankDetails() {
    const bankDetails: BankDetails[] = await this.bankDetailsModel.find({});

    if (bankDetails.length)
      throw new NotFoundException('NO Banks detais was found');

    return bankDetails;
  }
  async findAllUserBankDetails(id: string) {
    const bankDetails: BankDetails[] = await this.bankDetailsModel.find({
      userId: new mongoose.Types.ObjectId(id),
    });

    if (!bankDetails.length)
      throw new NotFoundException('NO Banks detais was found for this user');

    return bankDetails;
  }
  async findUserBankDetailsById(id: string) {
    const bankDetails: BankDetails = await this.bankDetailsModel.findById(id);

    if (!bankDetails)
      throw new NotFoundException('NO Banks details was found for this user');

    return bankDetails;
  }
  async findAll() {
    const bankDetails = await this.bankDetailsModel.find();
    if (!bankDetails.length) {
      throw new NotFoundException('Not bank Details found');
    }
    return bankDetails;
  }

  //   async bankDetailsPreview(verifyBankDetailsDto: VerifyBankDetailsDto) {
  //     const verifiedBankDetails = await this.verifyBankDetails(
  //       verifyBankDetailsDto,
  //     );

  //     if (verifiedBankDetails.status === true) {
  //       const details = {
  //         accountName: verifiedBankDetails.data.account_number,
  //         accountNumber: verifiedBankDetails.data.account_name,
  //       };
  //       return details;
  //     }
  //   }
}
