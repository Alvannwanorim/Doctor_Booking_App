import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDto } from './dto/address.dto';
import {
  DeliveryAddress,
  DeliveryAddressDocument,
} from './schema/addresses.schema';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(DeliveryAddress.name)
    private addressModel: Model<DeliveryAddressDocument>,
  ) {}

  public async createUserAddress(addressDto: AddressDto, userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const address = new this.addressModel({ user: userId, ...addressDto });
    await address.save();
    return address;
  }
  public async getUserAddress(userId: string) {
    const addresses = await this.addressModel.find({ user: userId });
    return addresses;
  }
  public async getUserAddressById(addressId: string) {
    const address = await this.addressModel.findById(addressId);
    if (!address) throw new NotFoundException('address not found');
    return address;
  }
  public async DeleteUserAddress(addressId: string) {
    const address = await this.addressModel.findById(addressId);
    if (!address) throw new NotFoundException('address not found');
    await address.remove();
    return address;
  }
  public async updateUserAddress(addressDto: AddressDto, addressId: string) {
    const address = await this.addressModel.findById(addressId);
    if (!address) throw new NotFoundException('address not found');
    const updatedAddress = await this.addressModel.findByIdAndUpdate(
      { _id: address._id },
      { ...addressDto },
      { new: true },
    );
    return updatedAddress;
  }
}
