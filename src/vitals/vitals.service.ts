import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { VitalsDto } from './dto/vitals.dto';

@Injectable()
export class VitalsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  public async createPatientVitals(vitalsDto: VitalsDto, email: string) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient) throw new NotFoundException('patient not found');
    patient.vitals = { ...vitalsDto };
    await patient.save();
    return patient.vitals;
  }
  public async getPatientVitals(email: string) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient.vitals)
      throw new NotFoundException('patient vitals not found');
    return patient.vitals;
  }

  public async DeletePatientVitals(email: string) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient.vitals)
      throw new NotFoundException('patient vitals not found');
    const vitals = patient.vitals;
    patient.vitals = null;
    await patient.save();
    return vitals;
  }
  public async updatePatientVitals(vitalsDto: VitalsDto, email: string) {
    const patient = await this.patientModel.findOne({ email });
    if (!patient) throw new NotFoundException('patient not found');
    patient.vitals = { ...vitalsDto };
    await patient.save();
    return patient.vitals;
  }
}
