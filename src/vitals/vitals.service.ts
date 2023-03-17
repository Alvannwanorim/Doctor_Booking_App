import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { VitalsDto } from './dto/vitals.dto';
import { Vitals, VitalsDocument } from './schema/vitals.schema';

@Injectable()
export class VitalsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Vitals.name)
    private vitalsModel: Model<VitalsDocument>,
  ) {}

  public async createUserVitals(vitalsDto: VitalsDto, userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const vitals = await this.vitalsModel.findOne({ user: userId });
    if (vitals) {
      const updatedVitals = await this.vitalsModel.findByIdAndUpdate(
        { _id: vitals._id },
        { ...vitalsDto },
        { new: true },
      );
      return updatedVitals;
    }
    const newVitals = new this.vitalsModel({ user: userId, ...vitalsDto });
    await newVitals.save();
    return newVitals;
  }
  public async getUserVitals(userId: string) {
    const vitals = await this.vitalsModel.find({ user: userId });
    return vitals;
  }
  public async getUserVitalsById(vitalsId: string) {
    const vitals = await this.vitalsModel.findById(vitalsId);
    if (!vitals) throw new NotFoundException('Vitals record not found');
    return vitals;
  }
  public async DeleteUserVitals(vitalsId: string) {
    const vitals = await this.vitalsModel.findById(vitalsId);
    if (!vitals) throw new NotFoundException('Vitals record not found');
    await vitals.remove();
    return vitals;
  }
  public async updateUserVitals(vitalsDto: VitalsDto, vitalsId: string) {
    const vitals = await this.vitalsModel.findById(vitalsId);
    if (!vitals) throw new NotFoundException('Vitals record not found');
    const updatedVitals = await this.vitalsModel.findByIdAndUpdate(
      { _id: vitals._id },
      { ...vitalsDto },
      { new: true },
    );
    return updatedVitals;
  }
}
