import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { AddressDto } from './dto/address.dto';
import {
  DeliveryAddress,
  DeliveryAddressDocument,
} from './schema/addresses.schema';

@Injectable()
export class DeliveryAddressService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(DeliveryAddress.name)
    private addressModel: Model<DeliveryAddressDocument>,
  ) {}

  public async createUserAddress(addressDto: AddressDto, patientId: string) {
    const user = await this.patientModel.findById(patientId);
    if (!user) throw new NotFoundException('User not found');

    const address = new this.addressModel({ patient: user._id, ...addressDto });
    await address.save();
    return address;
  }
  public async getUserAddress(patientId: string) {
    const id = new mongoose.Types.ObjectId(patientId);

    const addresses = await this.addressModel.find({ patient: id });
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
