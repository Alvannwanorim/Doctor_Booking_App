import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DoctorService } from './doctor.service';
import { ConsultationFeeDto } from './dto/consultation-fee.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorStatusDto } from './dto/update-doctor-status.dto';
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
  @Get('all')
  public async getDoctors() {
    return await this.doctorService.getDoctors();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:doctorId')
  public async getDoctorById(@Param('doctorId') doctorId: string) {
    return await this.doctorService.getDoctorById(doctorId);
  }
}
