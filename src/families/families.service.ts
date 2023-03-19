import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { FamiliesDto } from '../families/dto/families.dto';
import { Families, FamiliesDocument } from '../families/schema/families.schema';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Families.name)
    private familiesModel: Model<FamiliesDocument>,
  ) {}

  public async createPatientFamilies(
    familiesDto: FamiliesDto,
    patientId: string,
  ) {
    const patient = await this.patientModel.findById(patientId);
    if (!patient) throw new NotFoundException('patient not found');
    const newFamilies = new this.familiesModel({
      patient: patientId,
      ...familiesDto,
    });
    await newFamilies.save();
    return newFamilies;
  }
  public async getPatientFamilies(patientId: string) {
    const families = await this.familiesModel.find({ patient: patientId });
    return families;
  }
  public async getPatientFamiliesById(familiesId: string) {
    const family = await this.familiesModel.findById(familiesId);
    if (!family) throw new NotFoundException('Families record not found');
    return family;
  }
  public async deletePatientFamilies(familiesId: string) {
    const family = await this.familiesModel.findById(familiesId);
    if (!family) throw new NotFoundException('Families record not found');
    await family.remove();
    return family;
  }
  public async updatePatientFamilies(
    familiesDto: FamiliesDto,
    familiesId: string,
  ) {
    const families = await this.familiesModel.findById(familiesId);
    if (!families) throw new NotFoundException('Families record not found');
    const updatedFamilies = await this.familiesModel.findByIdAndUpdate(
      { _id: families._id },
      { ...familiesDto },
      { new: true },
    );
    return updatedFamilies;
  }
}
