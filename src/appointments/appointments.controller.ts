import { Controller } from '@nestjs/common';
import { Post, Body, Req, Get } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsDto } from './dto/appointments.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  public async createAppointments(@Body() appointmentDto: AppointmentsDto) {
    return await this.appointmentsService.createNewAppointments(appointmentDto);
  }
}
