import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
const { ObjectId } = mongoose.Schema.Types;
@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  public async createDoctor(userId: string, doctorDto: DoctorDto) {
    const doctor = await this.doctorModel.findById(userId);
    if (doctor) {
      return doctor;
    }
    const newDoctor = new this.doctorModel({ userId, ...doctorDto });
    await newDoctor.save();
    return doctor;
  }
}
