import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DoctorService } from './doctor.service';
import { AvailabilityDto } from './dto/availability.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/users/types/user.type';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('availability')
export class AvailabilityController {
  constructor(private doctorService: DoctorService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.DOCTOR)
  @Post('')
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
  @Delete('')
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
  @Get('')
  public async getDoctorAvailability(@Req() req) {
    return await this.doctorService.getDoctorAvailability(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('today')
  public async getDoctorAvailabilityToday(@Req() req) {
    return await this.doctorService.getDoctorAvailabilityToday(req.user._id);
  }
}
