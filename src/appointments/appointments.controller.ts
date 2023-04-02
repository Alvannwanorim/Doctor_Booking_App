import { Controller, UseGuards } from '@nestjs/common';
import { Post, Body, Req, Get } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/users/types/user.type';
import { AppointmentsService } from './appointments.service';
import { AppointmentsDto } from './dto/appointments.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.PATIENT)
  @Post()
  public async bookNewAppointments(
    @Body() appointmentDto: AppointmentsDto,
    @Req() req,
  ) {
    return await this.appointmentsService.bookNewAppointments(
      appointmentDto,
      req.user._id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.DOCTOR)
  @Get('/doctor')
  public async getallDoctorsAppointments(@Req() req) {
    return this.appointmentsService.getAllDoctorsAppointments(req.user._id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.PATIENT)
  @Get('/patient')
  public async getallPatientAppointments(@Req() req) {
    return await this.appointmentsService.getallPatientAppointments(
      req.user._id,
    );
  }
}
