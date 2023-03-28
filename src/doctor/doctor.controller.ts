import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ConsultationFeeDto } from './dto/consultation-fee.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorStatusDto } from './interfaces/update-doctor-status.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post('')
  public async createDoctor(@Body() createDoctor: CreateDoctorDto) {
    return await this.doctorService.createDoctor(createDoctor);
  }

  @Put('status/:doctorId')
  public async updateDoctorStatus(
    @Param('doctorId') doctorId: string,
    statusDto: UpdateDoctorStatusDto,
  ) {
    return await this.doctorService.updateDoctorStatus(doctorId, statusDto);
  }
  @Put('consultation-fee/:doctorId')
  public async updateDoctorConsultationFee(
    @Param('doctorId') doctorId: string,
    consultationFee: ConsultationFeeDto,
  ) {
    return await this.doctorService.updateDoctorConsultationFee(
      doctorId,
      consultationFee,
    );
  }

  @Get('')
  public async getDoctors() {
    return await this.doctorService.getDoctors();
  }
  @Get('/:doctorId')
  public async getDoctorById(@Param('doctorId') doctorId: string) {
    return await this.doctorService.getDoctorById(doctorId);
  }
}
