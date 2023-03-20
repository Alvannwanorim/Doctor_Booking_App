import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/doctor/schema/doctor.schema';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { AppointmentsDto } from './dto/appointments.dto';
import moment from 'moment';
import {
  Appointments,
  AppointmentsDocument,
} from './schema/appointments.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointments.name)
    private appointmentModel: Model<AppointmentsDocument>,
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name)
    private doctorModel: Model<DoctorDocument>,
  ) {}

  public async createNewAppointments(appointmentDto: AppointmentsDto) {
    const patient = await this.patientModel.findById(appointmentDto.patient);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const doctor = await this.doctorModel.findById(appointmentDto.doctor);
    if (!doctor) {
      throw new NotFoundException('Patient not found');
    }

    const appointment = new this.appointmentModel({ ...appointmentDto });
    await appointment.save();
    return appointment;
  }
}
