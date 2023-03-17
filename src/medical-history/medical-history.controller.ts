import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
    return await this.medicalHistoryService.getUserMedicalHistory(req.user._id);
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createUserMedicalHistory(
    @Body() medicalHistoryDto: MedicalHistoryDto,
    @Req() req,
  ) {
    return await this.medicalHistoryService.createUserMedicalHistory(
      medicalHistoryDto,
      req.user._id,
    );
  }
  @Put('/:medicalHistoryId')
  @UseGuards(JwtAuthGuard)
  public async updateUserMedicalHistory(
    @Body() medicalHistoryDto: MedicalHistoryDto,
    @Param('medicalHistoryId') medicalHistoryId,
  ) {
    return await this.medicalHistoryService.updateUserMedicalHistory(
      medicalHistoryDto,
      medicalHistoryId,
    );
  }
  @Delete('/:medicalHistoryId')
  @UseGuards(JwtAuthGuard)
  public async DeleteUserMedicalHistory(
    @Param('medicalHistoryId') medicalHistoryId,
  ) {
    return await this.medicalHistoryService.DeleteUserMedicalHistory(
      medicalHistoryId,
    );
  }
  @Get('/medical-history/:medicalHistoryId')
  @UseGuards(JwtAuthGuard)
  public async getUserMedicalHistoryById(
    @Param('medicalHistoryId') medicalHistoryId,
  ) {
    return await this.medicalHistoryService.getUserMedicalHistoryById(
      medicalHistoryId,
    );
  }
}
