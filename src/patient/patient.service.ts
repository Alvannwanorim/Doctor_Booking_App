import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { GoogleAuthDto } from 'src/auth/dto/google-auth.dto';
import { VERIFICATION } from './types/verification.types';
import { Doctor, DoctorDocument } from 'src/doctor/schema/doctor.schema';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { DoctorDto } from 'src/doctor/dto/doctor.dto';
import { Patient, PatientDocument } from './schema/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ROLES } from './types/patient.types';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  /**
   * Save patient information to database
   * @param patientDto docs to be saved. Must not be `CreatepatientDto`
   * @returns `patient`
   * @author Alvan
   */
  public async register(patientDto: CreatePatientDto): Promise<Patient | null> {
    const existingPatient = await this.patientModel.findOne({
      email: patientDto.email,
    });

    if (existingPatient)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'patient already exist',
        },
        HttpStatus.FORBIDDEN,
      );

    const exitingPhoneNumber = await this.patientModel.findOne({
      phone_number: patientDto.phone_number,
    });
    if (exitingPhoneNumber)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Phone number already in use',
        },
        HttpStatus.FORBIDDEN,
      );
    const patient = new this.patientModel({ ...patientDto });
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt);
    await patient.save();
    return patient;
  }

  /**
   * Retrieves a single patient from the database
   * @param email must be a valid email that exists in the database
   * @returns `patient`
   * @author Alvan
   */
  public async validatePatient(email: string): Promise<Patient | null> {
    const patient = this.patientModel.findOne({ email });
    if (!patient) return null;
    return patient;
  }

  public async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const patient = await this.patientModel.findOne({
      email: updatePasswordDto.email,
    });
    if (!patient) throw new NotFoundException('patient not found');

    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt);

    await patient.save();
    return patient;
  }

  public async createPatientByGoogleAuth(googleData: GoogleAuthDto) {
    const patient = await this.patientModel.findOne({
      email: googleData.email,
    });
    if (patient) {
      patient.verification_status = VERIFICATION.VERIFIED;
      await patient.save();
      return patient;
    }
    const newPatient = new this.patientModel({
      verification_status: VERIFICATION.VERIFIED,
      ...googleData,
    });
    await newPatient.save();
    return newPatient;
  }

  public async updatePhoneNumber(
    phoneNumberDto: PhoneNumberDto,
    patientId: string,
  ) {
    const patient = await this.patientModel.findById(patientId);
    if (patient) {
      throw new NotFoundException('patient not found');
    }
    const existingPhoneNumber = await this.patientModel.findOne({
      phone_number: phoneNumberDto.phone_number,
    });
    if (existingPhoneNumber && existingPhoneNumber._id !== patient._id) {
      throw new BadRequestException(
        'Phone number already in sue by another patient',
      );
    } else if (existingPhoneNumber && existingPhoneNumber._id === patient._id) {
      return patient;
    }
    patient.phone_number = phoneNumberDto.phone_number;
    await patient.save();
    return patient;
  }

  public async updateDoctor(patientId: string, doctorDto: DoctorDto) {
    const patient = await this.patientModel.findById(patientId);
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    const doctor = await this.doctorModel.findById(patientId);
    if (doctor) {
      return doctor;
    }
    const newDoctor = new this.doctorModel({ ...doctorDto });
    await newDoctor.save();

    patient.roles = ROLES.DOCTOR;
    await patient.save();
    return doctor;
  }

  public async getCurrentPatient(patientId: string) {
    const patient = await this.patientModel
      .findById(patientId)
      .select('-password');
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    return patient;
  }

  public async getPatientById(patientId: string) {
    const patient = await this.patientModel
      .findById(patientId)
      .select('-password');
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    return patient;
  }
  public async deletePatient(patientId: string) {
    const patient = await this.patientModel
      .findById(patientId)
      .select('-password');

    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    if (patient.roles === ROLES.DOCTOR) {
      throw new BadRequestException('process not completed');
    }
    await patient.remove();
    return patient;
  }
  public async getAllPatient() {
    const patients = await this.patientModel
      .find({ roles: ROLES.PATIENT })
      .select('-password');
    return patients;
  }
  public async updatePatient(patientData: UpdatePatientDto, patientId: string) {
    const patient = await this.patientModel.findById(patientId);
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    if (patientData.email !== patient.email) {
      const existingPatient = await this.patientModel.findOne({
        email: patientData.email,
      });
      if (existingPatient)
        throw new BadRequestException(
          'This email is already in use by another patient',
        );
      const updatedPatient = await this.patientModel.findByIdAndUpdate(
        { _id: patientId },
        { verificationStatus: VERIFICATION.PENDING, ...patientData },
        { new: true },
      );

      delete updatedPatient.password;
      return updatedPatient;
    } else {
      const updatedPatient = await this.patientModel.findByIdAndUpdate(
        { _id: patientId },
        { ...patientData },
        { new: true },
      );
      delete updatedPatient.password;
      return updatedPatient;
    }
  }
}
