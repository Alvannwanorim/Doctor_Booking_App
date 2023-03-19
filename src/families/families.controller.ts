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
import { FamiliesDto } from './dto/families.dto';
import { FamiliesService } from './families.service';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  public async getUserFamilies(@Req() req) {
    return await this.familiesService.getUserFamilies(req.user._id);
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createUserFamilies(
    @Body() familiesDto: FamiliesDto,
    @Req() req,
  ) {
    return await this.familiesService.createUserFamilies(
      familiesDto,
      req.user._id,
    );
  }
  @Put('/:familiesId')
  @UseGuards(JwtAuthGuard)
  public async updateUserFamilies(
    @Body() familiesDto: FamiliesDto,
    @Param('familiesId') familiesId,
  ) {
    return await this.familiesService.updateUserFamilies(
      familiesDto,
      familiesId,
    );
  }
  @Delete('/:familiesId')
  @UseGuards(JwtAuthGuard)
  public async DeleteUserFamilies(@Param('familiesId') familiesId) {
    return await this.familiesService.DeleteUserFamilies(familiesId);
  }
  @Get('/:familiesId')
  @UseGuards(JwtAuthGuard)
  public async getUserFamiliesById(@Param('familiesId') familiesId) {
    return await this.familiesService.getUserFamiliesById(familiesId);
  }
}