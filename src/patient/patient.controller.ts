import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('register')
  public async createPatient(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientService.register(createPatientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAllPatients() {
    return await this.patientService.getAllPatient();
  }
  @Get('/:patientId')
  @UseGuards(JwtAuthGuard)
  public async findById(@Param('patientId') patientId) {
    return await this.patientService.getPatientById(patientId);
  }
  @Delete('/delete/:patientId')
  @UseGuards(JwtAuthGuard)
  public async deletePatient(@Param('patientId') patientId) {
    return await this.patientService.deletePatient(patientId);
  }
  @Put('/update')
  @UseGuards(JwtAuthGuard)
  public async UpdateUser(@Body() patientData: UpdatePatientDto, @Req() req) {
    return await this.patientService.updatePatient(patientData, req.user.email);
  }
}
