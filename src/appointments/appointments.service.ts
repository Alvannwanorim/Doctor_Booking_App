import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/doctor/schema/doctor.schema';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import {
  AppointmentsDto,
  UpdateAppointmentsDto,
  UpdateAppointmentStatusDto,
} from './dto/appointments.dto';
// import moment from 'moment';
import {
  Appointments,
  AppointmentsDocument,
} from './schema/appointments.schema';
import { APPOINTMENTS_STATUS } from './types/appointments-status.type';

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

  private populateDoctor = {
    path: 'doctor',
    model: this.doctorModel,
    select: [
      'first_name',
      'last_name',
      'email',
      'rating',
      'professional_experience',
    ],
  };

  public validateTime(timeStr: string): boolean {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return regex.test(timeStr);
  }

  public isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  public isPastDate(dateString: string): boolean {
    const date: Date = new Date(dateString);
    const currentDate: Date = new Date();
    return date < currentDate;
  }

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
    const validStartTime = this.validateTime(appointmentDto.from);
    const validEndTime = this.validateTime(appointmentDto.to);

    if (!validEndTime)
      throw new BadRequestException('Provide a valid start time ');
    if (!validStartTime)
      throw new BadRequestException(' Provide a valid end time');

    const pastDate = this.isPastDate(appointmentDto.date);
    if (pastDate) throw new BadRequestException('Date cannot be in the past');

    const existingAppointment = await this.appointmentModel.findOne({
      date: appointmentDto.date,
      from: { $lt: appointmentDto.to },
      to: { $gt: appointmentDto.from },
    });

    if (existingAppointment)
      throw new BadRequestException('This date and time is not available');

    // check for user balance
    // attempt charge from user balance
    const appointment = new this.appointmentModel({
      patient: patient._id,
      ...appointmentDto,
    });
    await appointment.save();

    //
    return appointment;
  }

  public async getallPatientAppointments(userId: string) {
    const patient = await this.patientModel.findOne({ userId });
    const appointments = await this.appointmentModel
      .find({
        patient: patient._id,
      })
      .populate([this.populatePatient])
      .populate([this.populateDoctor]);
    return appointments;
  }
  public async getAllDoctorsAppointments(userId: string) {
    const doctor = await this.doctorModel.findOne({ userId });
    const appointments = await this.appointmentModel
      .find({
        doctor: doctor._id,
      })
      .populate([this.populatePatient])
      .populate([this.populateDoctor]);

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

  public async updateAppointmentStatus(
    appointmentId: string,
    status: UpdateAppointmentStatusDto,
  ) {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { ...status },
      { new: true },
    );
    return appointment;
  }

  public async updateAppointment(
    appointmentId: string,
    updateDto: UpdateAppointmentsDto,
  ) {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status: APPOINTMENTS_STATUS.RESCHEDULED, ...updateDto },
      { new: true },
    );
    return appointment;
  }
}
