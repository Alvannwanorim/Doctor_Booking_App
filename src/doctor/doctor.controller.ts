import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DoctorService } from './doctor.service';
import { ConsultationFeeDto } from './dto/consultation-fee.dto';
import {
  CreateDoctorDto,
  ProfessionalExperienceDto,
} from './dto/create-doctor.dto';
import { UpdateDoctorStatusDto } from './dto/update-doctor-status.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/users/types/user.type';
import { QualificationsDto } from './dto/qualifications.dto';
import { DocumentsDto } from './dto/documents.dto';
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

  @Get('unauthorized')
  public async getAllDoctors() {
    return await this.doctorService.getDoctors();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:doctorId')
  public async getDoctorById(@Param('doctorId') doctorId: string) {
    return await this.doctorService.getDoctorById(doctorId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.DOCTOR)
  @Put('professional-experience')
  public async updateProfessionalExperience(
    @Req() req,
    @Body() professionalExperienceDto: ProfessionalExperienceDto,
  ) {
    return await this.doctorService.updateProfessionalExperience(
      req.user._id,
      professionalExperienceDto,
    );
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.DOCTOR)
  @Put('qualifications')
  public async updateQualifications(
    @Req() req,
    @Body() qualificationsDto: QualificationsDto,
  ) {
    return await this.doctorService.updateQualifications(
      req.user._id,
      qualificationsDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.DOCTOR)
  @Put('documents')
  public async updateDocuments(@Req() req, @Body() documentsDto: DocumentsDto) {
    return await this.doctorService.updateDocuments(req.user._id, documentsDto);
  }
}
