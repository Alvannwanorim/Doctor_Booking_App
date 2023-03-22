import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ConsultationFeeDto } from './interfaces/consultation-fee.dto';
import { UpdateDoctorStatusDto } from './interfaces/update-doctor-status.dto';
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

  public async updateDoctorStatus(
    doctorId: string,
    statusDto: UpdateDoctorStatusDto,
  ) {
    const doctor = await this.doctorModel.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    doctor.status = statusDto.status;
    await doctor.save();
    return doctor;
  }

  public async getDoctors() {
    const doctors = await this.doctorModel.find({});
    return doctors;
  }

  public async getDoctorById(doctorId: string) {
    const doctor = await this.doctorModel.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }
  public async updateDoctorConsultationFee(
    doctorId: string,
    consultationFee: ConsultationFeeDto,
  ) {
    const doctor = await this.doctorModel.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    doctor.consultation_fee = consultationFee.consultation_fee;
    await doctor.save();
    return doctor;
  }
}
