import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { MedicalHistoryDto } from '../medical-history/dto/medical-history.dto';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  public async createPatientMedicalHistory(
    medicalHistoryDto: MedicalHistoryDto,
    email: string,
  ) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient) throw new NotFoundException('patient not found');
    patient.medical_history = { ...medicalHistoryDto };
    await patient.save();
    return patient.medical_history;
  }

  public async getPatientMedicalHistory(email: string) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient)
      throw new NotFoundException('patient medical history not found');
    return patient.medical_history;
  }

  public async deletePatientMedicalHistory(email: string) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient)
      throw new NotFoundException('patient medical history not found');
    const medicalHistory = patient.medical_history;
    patient.medical_history = null;
    await patient.save();
    return medicalHistory;
  }
  public async updatePatientMedicalHistory(
    medicalHistoryDto: MedicalHistoryDto,
    email: string,
  ) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient) throw new NotFoundException('patient not found');
    patient.medical_history = { ...medicalHistoryDto };
    await patient.save();
    return patient.medical_history;
  }
}
