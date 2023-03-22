import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
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
}
