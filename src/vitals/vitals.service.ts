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

  public async createPatientVitals(vitalsDto: VitalsDto, patientId: string) {
    const patient = await this.patientModel.findById(patientId);
    if (!patient) throw new NotFoundException('patient not found');
    patient.vitals = { ...vitalsDto };
    await patient.save();
    return patient.vitals;
  }
  public async getPatientVitals(patientId: string) {
    const patient = await this.patientModel.findById(patientId);
    if (!patient.vitals)
      throw new NotFoundException('patient vitals not found');
    patient.vitals;
  }

  public async DeletePatientVitals(patientId: string) {
    const patient = await this.patientModel.findById(patientId);
    if (!patient.vitals)
      throw new NotFoundException('patient vitals not found');
    const vitals = patient.vitals;
    delete patient.vitals;
    await patient.save();
    return vitals;
  }
  public async updatePatientVitals(vitalsDto: VitalsDto, patientId: string) {
    const patient = await this.patientModel.findById(patientId);
    if (!patient) throw new NotFoundException('patient not found');
    patient.vitals = { ...vitalsDto };
    await patient.save();
    return patient.vitals;
  }
}
