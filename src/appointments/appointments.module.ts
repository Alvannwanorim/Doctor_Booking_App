import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from 'src/doctor/schema/doctor.schema';
import { Patient, PatientSchema } from 'src/patient/schema/patient.schema';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointments, AppointmentsSchema } from './schema/appointments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointments.name, schema: AppointmentsSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
