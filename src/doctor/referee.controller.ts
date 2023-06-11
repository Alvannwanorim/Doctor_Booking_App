import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RefereeService } from './referee.service';
import { RefereeDto } from './dto/referee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/users/types/user.type';

@Controller('referee')
export class RefereeController {
  constructor(private refereeService: RefereeService) {}

  @Post('')
  @Roles(ROLES.DOCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  public async createReferee(@Body() refereeDto: RefereeDto, @Req() req) {
    return this.refereeService.createReferee(req.user._id, refereeDto);
  }
  @Get('')
  @Roles(ROLES.DOCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  public async getDoctorReferees(@Req() req) {
    return this.refereeService.getDoctorReferees(req.user._id);
  }

  @Delete('')
  @Roles(ROLES.DOCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  public async deleteDoctorReferees(@Param('referee_id') referee_id: string) {
    return this.refereeService.deleteDoctorReferees(referee_id);
  }
}
