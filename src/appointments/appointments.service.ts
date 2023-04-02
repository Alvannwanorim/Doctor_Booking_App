import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/doctor/schema/doctor.schema';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { AppointmentsDto } from './dto/appointments.dto';
// import moment from 'moment';
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

  private populatePatient = {
    path: 'patient',
    model: this.patientModel,
    select: ['first_name', 'last_name', 'email', 'medical_history', 'vitals'],
  };

  public async bookNewAppointments(
    appointmentDto: AppointmentsDto,
    userId: string,
  ) {
    const patient = await this.patientModel.findOne({ userId });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const doctor = await this.doctorModel.findById(appointmentDto.doctor);
    if (!doctor) {
      throw new NotFoundException('Patient not found');
    }

    const appointment = new this.appointmentModel({
      patient: patient._id,
      ...appointmentDto,
    });
    await appointment.save();
    return appointment;
  }

  public async getallPatientAppointments(userId: string) {
    const patient = await this.patientModel.findOne({ userId });
    const appointments = await this.appointmentModel
      .find({
        patient: patient._id,
      })
      .populate([this.populatePatient]);
    return appointments;
  }
  public async getAllDoctorsAppointments(userId: any) {
    const doctor_id = new mongoose.Types.ObjectId(userId);
    const appointments = await this.appointmentModel.find({
      doctor: doctor_id,
    });

    return appointments;
  }
  public async getAppointmentById(id: any) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }
  public async getAllAppointments() {
    const appointment = await this.appointmentModel.find({});
    return appointment;
  }
}
