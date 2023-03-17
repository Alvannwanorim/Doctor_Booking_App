import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { MedicalHistoryDto } from '../medical-history/dto/medical-history.dto';
import {
  MedicalHistory,
  MedicalHistoryDocument,
} from '../medical-history/schema/medical-history.schema';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(MedicalHistory.name)
    private medicalHistoryModel: Model<MedicalHistoryDocument>,
  ) {}

  public async createUserMedicalHistory(
    medicalHistoryDto: MedicalHistoryDto,
    userId: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const medicalHistory = await this.medicalHistoryModel.findOne({
      user: userId,
    });
    if (medicalHistory) {
      const updatedMedicalHistory =
        await this.medicalHistoryModel.findByIdAndUpdate(
          { _id: medicalHistory._id },
          { ...medicalHistoryDto },
          { new: true },
        );
      return updatedMedicalHistory;
    }
    const newMedicalHistory = new this.medicalHistoryModel({
      user: userId,
      ...MedicalHistoryDto,
    });
    await newMedicalHistory.save();
    return newMedicalHistory;
  }
  public async getUserMedicalHistory(userId: string) {
    const medicalHistories = await this.medicalHistoryModel.find({
      user: userId,
    });
    return medicalHistories;
  }
  public async getUserMedicalHistoryById(medicalHistoryId: string) {
    const medicalHistory = await this.medicalHistoryModel.findById(
      medicalHistoryId,
    );
    if (!medicalHistory)
      throw new NotFoundException('Medical history record not found');
    return medicalHistory;
  }
  public async DeleteUserMedicalHistory(MedicalHistoryId: string) {
    const MedicalHistory = await this.medicalHistoryModel.findById(
      MedicalHistoryId,
    );
    if (!MedicalHistory)
      throw new NotFoundException('Medical history record not found');
    await MedicalHistory.remove();
    return MedicalHistory;
  }
  public async updateUserMedicalHistory(
    medicalHistoryDto: MedicalHistoryDto,
    medicalHistoryId: string,
  ) {
    const medicalHistory = await this.medicalHistoryModel.findById(
      medicalHistoryId,
    );
    if (!medicalHistory)
      throw new NotFoundException('Medical history record not found');
    const updatedMedicalHistory =
      await this.medicalHistoryModel.findByIdAndUpdate(
        { _id: medicalHistory._id },
        { ...medicalHistoryDto },
        { new: true },
      );
    return updatedMedicalHistory;
  }
}
