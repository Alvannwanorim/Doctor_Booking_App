import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VERIFICATION } from '../users/types/verification.types';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { Patient, PatientDocument } from './schema/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ROLES } from 'src/users/types/user.type';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    private readonly userService: UsersService,
  ) {}

  /**
   * Save patient information to database
   * @param patientDto docs to be saved. Must not be `CreatePatientDto`
   * @returns `patient`
   * @author Alvan
   */
  public async register(patientDto: CreatePatientDto): Promise<Patient | null> {
    const userData: UserDto = {
      email: patientDto.email,
      phone_number: patientDto.phone_number,
      first_name: patientDto.first_name,
      last_name: patientDto.last_name,
      password: patientDto.password,
      roles: ROLES.PATIENT,
    };
    const existingPatient = await this.patientModel.findOne({
      email: patientDto.email,
    });
    if (existingPatient)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'email already exist',
        },
        HttpStatus.FORBIDDEN,
      );
    const newUser = await this.userService.createUser(userData);
    if (newUser) {
      delete patientDto.password;
      const patient = new this.patientModel({ ...patientDto });
      await patient.save();
      return patient;
    }
  }

  /**
   * Retrieves a single patient from the database
   * @param email must be a valid email that exists in the database
   * @returns `patient`
   * @author Alvan
   */

  public async updatePhoneNumber(
    phoneNumberDto: PhoneNumberDto,
    patientId: string,
  ) {
    const patient = await this.patientModel.findById(patientId);
    if (patient) {
      throw new NotFoundException('patient not found');
    }
    const existingPhoneNumber = await this.userService.findUserByPhoneNumber(
      phoneNumberDto.phone_number,
    );
    if (
      existingPhoneNumber &&
      existingPhoneNumber.phone_number !== patient.phone_number
    ) {
      throw new BadRequestException(
        'Phone number already in sue by another patient',
      );
    }
    patient.phone_number = phoneNumberDto.phone_number;
    await patient.save();
    return patient;
  }

  public async getPatientById(patientId: string) {
    const patient = await this.patientModel.findById(patientId);

    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    return patient;
  }
  public async deletePatient(patientId: string) {
    const patient = await this.patientModel.findById(patientId);

    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    await this.userService.removerUser(patient.email);
    await patient.remove();
    return patient;
  }
  public async getAllPatient() {
    const patients = await this.patientModel.find({});
    return patients;
  }
  public async updatePatient(patientData: UpdatePatientDto, email: string) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    if (patientData.email !== patient.email) {
      const existingPatient = await this.userService.findUserByEmail(
        patientData.email,
      );
      if (existingPatient)
        throw new BadRequestException(
          'This email is already in use by another patient',
        );
      const updatedPatient = await this.patientModel.findByIdAndUpdate(
        { _id: patient._id },
        { verificationStatus: VERIFICATION.PENDING, ...patientData },
        { new: true },
      );

      return updatedPatient;
    } else if (patientData.phone_number !== patient.phone_number) {
      const existingPatient = await this.userService.findUserByPhoneNumber(
        patientData.phone_number,
      );
      if (existingPatient)
        throw new BadRequestException(
          'This phone number is already in use by another patient',
        );
      const updatedPatient = await this.patientModel.findByIdAndUpdate(
        { _id: patient._id },
        { verificationStatus: VERIFICATION.PENDING, ...patientData },
        { new: true },
      );

      return updatedPatient;
    } else {
      const updatedPatient = await this.patientModel.findByIdAndUpdate(
        { _id: patient._id },
        { ...patientData },
        { new: true },
      );

      return updatedPatient;
    }
  }
}
