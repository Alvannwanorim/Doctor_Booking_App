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
import { VitalsDto } from './dto/vitals.dto';
import { VitalsService } from './vitals.service';

@Controller('vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  //vitals
  @Get('')
  @UseGuards(JwtAuthGuard)
  public async getUserVitals(@Req() req) {
    return await this.vitalsService.getUserVitals(req.user._id);
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createUserVitals(@Body() vitalsDto: VitalsDto, @Req() req) {
    return await this.vitalsService.createUserVitals(vitalsDto, req.user._id);
  }
  @Put('/vitals/:vitalsId')
  @UseGuards(JwtAuthGuard)
  public async updateUserVitals(
    @Body() vitalsDto: VitalsDto,
    @Param('vitalsId') vitalsId,
  ) {
    return await this.vitalsService.updateUserVitals(vitalsDto, vitalsId);
  }
  @Delete('/vitals/:vitalsId')
  @UseGuards(JwtAuthGuard)
  public async DeleteUserVitals(@Param('vitalsId') vitalsId) {
    return await this.vitalsService.DeleteUserVitals(vitalsId);
  }
  @Get('/vitals/:vitalsId')
  @UseGuards(JwtAuthGuard)
  public async getUserVitalsById(@Param('vitalsId') addressId) {
    return await this.vitalsService.getUserVitalsById(addressId);
  }
}
