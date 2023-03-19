import { Body, Controller, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post('')
  public async createDoctor(@Body() createDoctor: CreateDoctorDto) {
    return await this.doctorService.createDoctor(createDoctor);
  }
}
