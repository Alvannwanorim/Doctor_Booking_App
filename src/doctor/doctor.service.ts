import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  CreateDoctorDto,
  ProfessionalExperienceDto,
} from './dto/create-doctor.dto';
import { ConsultationFeeDto } from './dto/consultation-fee.dto';
import { UpdateDoctorStatusDto } from './dto/update-doctor-status.dto';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ROLES } from 'src/users/types/user.type';
import { AvailabilityDto } from './dto/availability.dto';
import {
  Availability,
  AvailabilityDocument,
} from './schema/availability.schema';
import { QualificationsDto } from './dto/qualifications.dto';
import { DocumentsDto } from './dto/documents.dto';
@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Availability.name)
    private availabilityModel: Model<AvailabilityDocument>,
    private readonly userService: UsersService,
  ) {}

  public async createDoctor(doctorDto: CreateDoctorDto) {
    const userData: UserDto = {
      email: doctorDto.email,
      phone_number: doctorDto.phone_number,
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

  public validateTime(timeStr: string): boolean {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return regex.test(timeStr);
  }

  public async createOrUpdateDoctorAvailability(
    availabilityDto: AvailabilityDto,
    doctorId: string,
  ) {
    const doctor_id = new mongoose.Types.ObjectId(doctorId);
    const validTime = this.validateTime(availabilityDto.time);
    if (!validTime) throw new BadRequestException('Invalid time format');
    const weekdayAvailability = await this.availabilityModel.findOne({
      doctor: doctor_id,
      weekday: availabilityDto.week_day,
    });
    if (weekdayAvailability) {
      const timeSlot = await this.availabilityModel.findOne({
        doctor: doctor_id,
        weekday: availabilityDto.week_day,
        slots: { $in: [availabilityDto.time] },
      });

      if (timeSlot) return timeSlot;
      const updatedAvailability = await this.availabilityModel.findOneAndUpdate(
        { doctor: doctorId, weekday: availabilityDto.week_day },
        { $push: { slots: availabilityDto.time } },
        { new: true },
      );
      return updatedAvailability;
    }
    const newWeekdayAvailability = new this.availabilityModel({
      doctor: doctor_id,
      weekday: availabilityDto.week_day,
      slots: [availabilityDto.time],
    });

    await newWeekdayAvailability.save();
    return newWeekdayAvailability;
  }

  public async deleteTimeSlot(
    availabilityDto: AvailabilityDto,
    doctorId: string,
  ) {
    const doctor_id = new mongoose.Types.ObjectId(doctorId);
    const timeSlot = await this.availabilityModel.findOneAndUpdate(
      { doctor: doctor_id, weekday: availabilityDto.week_day },
      { $pull: { slots: availabilityDto.time } },
      { new: true },
    );
    return timeSlot;
  }
  public getCurrentDate() {
    const currentDate = new Date();
    const weekdays = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    const currentWeekday = weekdays[currentDate.getDay()];
    return currentWeekday;
  }
  public async getDoctorAvailabilityToday(doctorId: string) {
    const currentDate = this.getCurrentDate();
    const doctor_id = new mongoose.Types.ObjectId(doctorId);
    const availability = await this.availabilityModel.findOne({
      doctor: doctor_id,
      weekday: currentDate,
    });
    if (!availability) throw new NotFoundException('Not record was found');
    return availability;
  }
  public async getDoctorAvailability(doctorId: string) {
    const doctor_id = new mongoose.Types.ObjectId(doctorId);

    const availability = await this.availabilityModel.find({
      doctor: doctor_id,
    });
    return availability;
  }

  public async updateDocuments(_id: any, documentsDto: DocumentsDto) {
    const doctor = await this.doctorModel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(_id) },
      { documents: documentsDto },
      { new: true },
    );
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }
  public async updateQualifications(
    _id: any,
    qualificationsDto: QualificationsDto,
  ) {
    const doctor = await this.doctorModel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(_id) },
      { qualifications: qualificationsDto },
      { new: true },
    );
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }
  public async updateProfessionalExperience(
    _id: any,
    professionalExperienceDto: ProfessionalExperienceDto,
  ) {
    const doctor = await this.doctorModel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(_id) },
      { professional_experience: professionalExperienceDto },
      { new: true },
    );
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }
}
