import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FamiliesDto } from './dto/families.dto';
import { Families, FamiliesDocument } from './schema/families.schema';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Families.name)
    private familiesModel: Model<FamiliesDocument>,
  ) {}

  public async createUserFamilies(familiesDto: FamiliesDto, userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const newFamilies = new this.familiesModel({
      user: userId,
      ...familiesDto,
    });
    await newFamilies.save();
    return newFamilies;
  }
  public async getUserFamilies(userId: string) {
    const families = await this.familiesModel.find({ user: userId });
    return families;
  }
  public async getUserFamiliesById(familiesId: string) {
    const family = await this.familiesModel.findById(familiesId);
    if (!family) throw new NotFoundException('Families record not found');
    return family;
  }
  public async DeleteUserFamilies(familiesId: string) {
    const family = await this.familiesModel.findById(familiesId);
    if (!family) throw new NotFoundException('Families record not found');
    await family.remove();
    return family;
  }
  public async updateUserFamilies(
    familiesDto: FamiliesDto,
    familiesId: string,
  ) {
    const families = await this.familiesModel.findById(familiesId);
    if (!families) throw new NotFoundException('Families record not found');
    const updatedFamilies = await this.familiesModel.findByIdAndUpdate(
      { _id: families._id },
      { ...familiesDto },
      { new: true },
    );
    return updatedFamilies;
  }
}
