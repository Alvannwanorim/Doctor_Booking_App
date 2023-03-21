import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from 'src/doctor/doctor.module';
import { Doctor, DoctorSchema } from 'src/doctor/schema/doctor.schema';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patient, PatientSchema } from './schema/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
    DoctorModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService, MongooseModule],
})
export class PatientModule {}