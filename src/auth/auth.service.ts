import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { JwtDto } from './dto/jwt.dto';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { DoctorDto } from 'src/doctor/dto/doctor.dto';
import { Doctor } from 'src/doctor/schema/doctor.schema';
import { PatientService } from 'src/patient/patient.service';
import { Patient } from 'src/patient/schema/patient.schema';
import { ROLES } from 'src/patient/types/patient.types';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { UpdatePasswordDto } from 'src/patient/dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description Fetches patient records from the database
   * @param email
   * @param password
   * @returns `patient`
   */
  public async validate(
    email: string,
    password: string,
  ): Promise<Patient | null> {
    const patient = await this.patientService.validatePatient(email);
    if (!patient) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
      throw new BadRequestException('Incorrect patient credentials');
    return patient;
  }

  /**
   * @description Fetches patient records from the database
   * @param email
   * @param password
   * @returns `patient`
   */
  public async validateByEmail(email: string): Promise<Patient | null> {
    const patient = await this.patientService.validatePatient(email);
    if (!patient) {
      return null;
    }
    return patient;
  }

  /**
   * @description generates `access_token` for a verified patient
   * @param patient of type `patient`
   * @returns `access_token`
   */
  async loginPatient(patient: Patient): Promise<{ access_token: string }> {
    if (patient.roles !== ROLES.PATIENT) {
      throw new UnauthorizedException();
    }
    const payload: JwtDto = {
      email: patient.email,
      sub: patient._id,
    };
    const access_token = this.signToken(payload);
    return { access_token };
  }
  async loginDoctor(patient: Patient): Promise<{ access_token: string }> {
    if (patient.roles !== ROLES.DOCTOR) {
      throw new UnauthorizedException();
    }
    const payload: JwtDto = {
      email: patient.email,
      sub: patient._id,
    };
    const access_token = this.signToken(payload);
    return { access_token };
  }

  signToken(payload: JwtDto) {
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return access_token;
  }

  /**
   * Save patient information to database
   * @param patientDto docs to be saved. Must not be `CreatepatientDto`
   * @returns `patient`
   * @author Alvan
   */
  public async register(createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.patientService.register(createPatientDto);
  }

  public async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return await this.patientService.updatePassword(updatePasswordDto);
  }

  public async createPatientByGoogleAuth(googleData: GoogleAuthDto) {
    const patient = await this.patientService.createPatientByGoogleAuth(
      googleData,
    );
    return this.loginPatient(patient);
  }

  // public async registerDoctor(
  //   createDoctorDto: CreateDoctorDto,
  // ): Promise<patient> {
  //   // const doctor = await this.patientService.registerDoctor(createDoctorDto);
  //   return;
  // }

  public async updateDoctor(
    patientId: string,
    doctorDto: DoctorDto,
  ): Promise<Doctor> {
    const doctor = await this.patientService.updateDoctor(patientId, doctorDto);
    return doctor;
  }

  public getCurrentPatient(patientId: string) {
    return this.patientService.getCurrentPatient(patientId);
  }
}
