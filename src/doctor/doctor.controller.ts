import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DoctorService } from './doctor.service';
import { ConsultationFeeDto } from './dto/consultation-fee.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorStatusDto } from './dto/update-doctor-status.dto';
import { AvailabilityDto } from './dto/availability.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/users/types/user.type';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post('')
  public async createDoctor(@Body() createDoctor: CreateDoctorDto) {
    return await this.doctorService.createDoctor(createDoctor);
  }

  @UseGuards(JwtAuthGuard)
  @Put('status/:doctorId')
  public async updateDoctorStatus(
    @Param('doctorId') doctorId: string,
    statusDto: UpdateDoctorStatusDto,
  ) {
    return await this.doctorService.updateDoctorStatus(doctorId, statusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('consultation-fee/:doctorId')
  public async updateDoctorConsultationFee(
    @Param('doctorId') doctorId: string,
    @Body() consultationFee: ConsultationFeeDto,
  ) {
    return await this.doctorService.updateDoctorConsultationFee(
      doctorId,
      consultationFee,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async getDoctors() {
    return await this.doctorService.getDoctors();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:doctorId')
  public async getDoctorById(@Param('doctorId') doctorId: string) {
    return await this.doctorService.getDoctorById(doctorId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.DOCTOR)
  @Post('availability')
  public async createOrUpdateDoctorAvailability(
    @Body() availabilityDto: AvailabilityDto,
    @Req() req,
  ) {
    return await this.doctorService.createOrUpdateDoctorAvailability(
      availabilityDto,
      req.user._id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.DOCTOR)
  @Delete('availability')
  public async deleteTimeSlot(
    @Body() availabilityDto: AvailabilityDto,
    @Req() req,
  ) {
    return await this.doctorService.deleteTimeSlot(
      availabilityDto,
      req.user._id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('availability')
  public async getDoctorAvailability(@Req() req) {
    console.log('here');

    return await this.doctorService.getDoctorAvailability(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('availability/today')
  public async getDoctorAvailabilityToday(@Req() req) {
    return await this.doctorService.getDoctorAvailability(req.user._id);
  }
}
