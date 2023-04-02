import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ConsultationFeeDto } from './dto/consultation-fee.dto';
import { UpdateDoctorStatusDto } from './interfaces/update-doctor-status.dto';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ROLES } from 'src/users/types/user.type';
@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private readonly userService: UsersService,
  ) {}

  public async createDoctor(doctorDto: CreateDoctorDto) {
    const userData: UserDto = {
      email: doctorDto.email,
      phone_number: doctorDto.password,
      first_name: doctorDto.first_name,
      last_name: doctorDto.last_name,
      password: doctorDto.password,
      roles: ROLES.DOCTOR,
    };
    const newUser = await this.userService.createUser(userData);
    if (newUser) {
      delete doctorDto.password;
      const newDoctor = new this.doctorModel({
        userId: newUser._id,
        ...doctorDto,
      });
      await newDoctor.save();
      return newDoctor;
    }
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
