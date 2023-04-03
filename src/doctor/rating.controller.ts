import {
  Controller,
  Body,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/users/types/user.type';
import { RatingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  /**
   * createNewRating
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.PATIENT)
  @Post('')
  public async createNewRating(@Body() ratingDto: RatingDto, @Req() req) {
    return await this.ratingService.createNewRating(ratingDto, req.user._id);
  }

  @Get('')
  public async getAllRatings() {
    return await this.ratingService.getAllRatings();
  }
  @Get('/:doctorId')
  public async getDoctorRating(@Param('doctorId') doctorId: string) {
    return await this.ratingService.getDoctorRating(doctorId);
  }
}
