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
import { VitalsDto } from './dto/vitals.dto';
import { VitalsService } from './vitals.service';

@Controller('vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  public async getUserVitals(@Req() req) {
    return await this.vitalsService.getPatientVitals(req.user.email);
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createPatientVitals(@Body() vitalsDto: VitalsDto, @Req() req) {
    return await this.vitalsService.createPatientVitals(
      vitalsDto,
      req.user.email,
    );
  }
  @Put('/update')
  @UseGuards(JwtAuthGuard)
  public async updatePatientVitals(@Body() vitalsDto: VitalsDto, @Req() req) {
    return await this.vitalsService.updatePatientVitals(
      vitalsDto,
      req.user.email,
    );
  }
  @Delete('')
  @UseGuards(JwtAuthGuard)
  public async DeletePatientVitals(@Req() req) {
    return await this.vitalsService.DeletePatientVitals(req.user.email);
  }
}
