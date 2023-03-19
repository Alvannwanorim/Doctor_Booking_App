import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  public async createDoctor(doctorDto: CreateDoctorDto) {
    const newDoctor = new this.doctorModel({ ...doctorDto });
    await newDoctor.save();
    return newDoctor;
  }
}
