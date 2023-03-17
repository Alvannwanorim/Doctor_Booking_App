import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { GoogleAuthDto } from 'src/auth/dto/google-auth.dto';
import { VERIFICATION } from './types/verification.types';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { ROLES } from './types/user.types';
import { Doctor, DoctorDocument } from 'src/doctor/schema/doctor.schema';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { DoctorDto } from 'src/doctor/dto/doctor.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Vitals, VitalsDocument } from '../vitals/schema/vitals.schema';

import { Families, FamiliesDocument } from './schema/families.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Vitals.name) private vitalsModel: Model<VitalsDocument>,
    @InjectModel(Families.name) private familiesModel: Model<FamiliesDocument>,
  ) {}

  /**
   * Save user information to database
   * @param userDto docs to be saved. Must not be `CreateUserDto`
   * @returns `User`
   * @author Alvan
   */
  public async register(userDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.userModel.findOne({ email: userDto.email });

    if (existingUser)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User already exist',
        },
        HttpStatus.FORBIDDEN,
      );

    const exitingPhoneNumber = await this.userModel.findOne({
      phoneNumber: userDto.phoneNumber,
    });
    if (exitingPhoneNumber)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Phone number already in use',
        },
        HttpStatus.FORBIDDEN,
      );
    const user = new this.userModel({ ...userDto });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return user;
  }

  /**
   * Retrieves a single User from the database
   * @param email must be a valid email that exists in the database
   * @returns `User`
   * @author Alvan
   */
  public async validateUser(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email });
    if (!user) return null;
    return user;
  }

  public async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userModel.findOne({
      email: updatePasswordDto.email,
    });
    if (!user) throw new NotFoundException('User not found');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return user;
  }

  public async createUserByGoogleAuth(googleData: GoogleAuthDto) {
    const user = await this.userModel.findOne({ email: googleData.email });
    if (user) {
      user.verificationStatus = VERIFICATION.VERIFIED;
      await user.save();
      return user;
    }
    const newUser = new this.userModel({
      verificationStatus: VERIFICATION.VERIFIED,
      ...googleData,
    });
    await newUser.save();
    return newUser;
  }

  public async registerDoctor(createDoctorDto: CreateDoctorDto) {
    const user = await this.register({
      firstName: createDoctorDto.firstName,
      lastName: createDoctorDto.lastName,
      email: createDoctorDto.email,
      password: createDoctorDto.password,
      phoneNumber: createDoctorDto.phoneNumber,
      roles: ROLES.DOCTOR,
    });
    if (user) {
      const doctor = new this.doctorModel({
        userId: user._id,
        dateOfBirth: createDoctorDto.dateOfBirth,
        gender: createDoctorDto.gender,
        country: createDoctorDto.country,
        state: createDoctorDto.state,
        address: createDoctorDto.address,
        category: createDoctorDto.category,
        experience: createDoctorDto.experience,
        professional_status: createDoctorDto.professional_status,
      });
      await doctor.save();
      return user;
    }
  }

  public async updatePhoneNumber(
    phoneNumberDto: PhoneNumberDto,
    userId: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (user) {
      throw new NotFoundException('user not found');
    }
    const existingPhoneNumber = await this.userModel.findOne({
      phoneNumber: phoneNumberDto.phoneNumber,
    });
    if (existingPhoneNumber && existingPhoneNumber._id !== user._id) {
      throw new BadRequestException(
        'Phone number already in sue by another user',
      );
    } else if (existingPhoneNumber && existingPhoneNumber._id === user._id) {
      return user;
    }
    user.phoneNumber = phoneNumberDto.phoneNumber;
    await user.save();
    return user;
  }

  public async updateDoctor(userId: string, doctorDto: DoctorDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const doctor = await this.doctorModel.findById(userId);
    if (doctor) {
      return doctor;
    }
    const newDoctor = new this.doctorModel({ details: userId, ...doctorDto });
    await newDoctor.save();

    user.roles = ROLES.DOCTOR;
    await user.save();
    return doctor;
  }

  public async getCurrentUser(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  public async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  public async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');

    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.roles === ROLES.DOCTOR) {
      throw new BadRequestException('process not completed');
    }
    await user.remove();
    return user;
  }
  public async getAllUser() {
    const users = await this.userModel
      .find({ roles: ROLES.PATIENT })
      .select('-password');
    return users;
  }
  public async updateUser(userData: UpdateUserDto, userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (userData.email !== user.email) {
      const existingUser = await this.userModel.findOne({
        email: userData.email,
      });
      if (existingUser)
        throw new BadRequestException(
          'This email is already in use by another user',
        );
      const updatedUser = await this.userModel.findByIdAndUpdate(
        { _id: userId },
        { verificationStatus: VERIFICATION.PENDING, ...userData },
        { new: true },
      );

      delete updatedUser.password;
      return updatedUser;
    } else {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        { _id: userId },
        { ...userData },
        { new: true },
      );
      delete updatedUser.password;
      return updatedUser;
    }
  }
}
