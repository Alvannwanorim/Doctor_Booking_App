import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MedicalHistoryDto } from './dto/medical-history.dto';
import { MedicalHistoryService } from './medical-history.service';

@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  //medical history
  @Get('')
  @UseGuards(JwtAuthGuard)
  public async getUserMedicalHistories(@Req() req) {
    return await this.medicalHistoryService.getPatientMedicalHistory(
      req.user.email,
    );
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createUserMedicalHistory(
    @Body() medicalHistoryDto: MedicalHistoryDto,
    @Req() req,
  ) {
    return await this.medicalHistoryService.createPatientMedicalHistory(
      medicalHistoryDto,
      req.user.email,
    );
  }
  @Put('/update')
  @UseGuards(JwtAuthGuard)
  public async updateUserMedicalHistory(
    @Body() medicalHistoryDto: MedicalHistoryDto,
    @Req() req,
  ) {
    return await this.medicalHistoryService.updatePatientMedicalHistory(
      medicalHistoryDto,
      req.user.email,
    );
  }
  @Delete('')
  @UseGuards(JwtAuthGuard)
  public async DeleteUserMedicalHistory(@Req() req) {
    return await this.medicalHistoryService.deletePatientMedicalHistory(
      req.user.email,
    );
  }
}
