import { InjectModel } from '@nestjs/mongoose';
import { Referee, RefereeDocument } from './schema/referee.schema';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import mongoose, { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RefereeDto } from './dto/referee.dto';

@Injectable()
export class RefereeService {
  constructor(
    @InjectModel(Referee.name) private refereeModel: Model<RefereeDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  public async createReferee(_id: any, refereeDto: RefereeDto) {
    const doctor = await this.doctorModel.findById(_id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const referee = new this.refereeModel({
      doctor: new mongoose.Types.ObjectId(_id),
      ...refereeDto,
    });

    await referee.save();
    return referee;
  }

  public async getDoctorReferees(_id: any) {
    const referees = await this.refereeModel.find({
      doctor: new mongoose.Types.ObjectId(_id),
    });
    return referees;
  }

  public async deleteDoctorReferees(referee_id: string) {
    const referee = await this.refereeModel.findById(referee_id);

    if (!referee) {
      throw new NotFoundException('Record not found');
    }
    await referee.remove();
    return referee;
  }
}
