import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { GoogleAuthDto } from 'src/auth/dto/google-auth.dto';
import { VERIFICATION } from './types/verification.types';
import { Doctor, DoctorDocument } from 'src/doctor/schema/doctor.schema';
import { ROLES } from './types/user.type';
import { ChangePasswordDto } from './dto/change_password.dto';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  public async createUser(userData: UserDto) {
    const existingUser = await this.userModel.findOne({
      email: userData.email,
    });

    if (existingUser)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'email already exist',
        },
        HttpStatus.FORBIDDEN,
      );
    const exitingPhoneNumber = await this.userModel.findOne({
      phone_number: userData.phone_number,
    });
    if (exitingPhoneNumber)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Phone number already in use',
        },
        HttpStatus.FORBIDDEN,
      );

    const user = new this.userModel({ ...userData });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return user;
  }

  public async createUserByGoogleAuth(googleData: GoogleAuthDto) {
    const user = await this.userModel.findOne({
      email: googleData.email,
    });
    if (user) {
      user.verification_status = VERIFICATION.VERIFIED;
      await user.save();
      return user;
    }
    const newPatient = new this.userModel({
      verification_status: VERIFICATION.VERIFIED,
      ...googleData,
    });
    await newPatient.save();
    return newPatient;
  }

  public async findUserByPhoneNumber(phone_number: string) {
    const user = await this.userModel.findOne({
      phone_number,
    });
    if (!user) return null;
    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      email,
    });
    if (!user) return null;
    return user;
  }

  public async validateUser(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email });
    if (!user) return null;
    return user;
  }

  public async getCurrentUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.roles === ROLES.DOCTOR) {
      const doctor = await this.doctorModel.findOne({ userId: user._id });
      return doctor;
    }
    if (user.roles === ROLES.PATIENT) {
      const patient = await this.patientModel.findOne({ userId: user._id });
      return patient;
    }
    delete user.password;
    return user;
  }

  public async removerUser(email: string) {
    const user = this.userModel.findOne({ email });
    if (!user) return;
    await user.remove();
    return;
  }

  public async changePassword(
    { new_password, old_password }: ChangePasswordDto,
    user_id,
  ) {
    const user = await this.userModel.findById(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Incorrect password',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);
    await user.save();
    return user;
  }

  public async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
