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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { MedicalHistoryService } from './medical-history.service';
@Controller('patient')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly medicalHistoryService: MedicalHistoryService,
  ) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAllUsers() {
    return await this.userService.getAllUser();
  }
  @Get('/:patientId')
  @UseGuards(JwtAuthGuard)
  public async findById(@Param('patientId') patientId) {
    return await this.userService.getUserById(patientId);
  }
  @Delete('/delete/:patientId')
  @UseGuards(JwtAuthGuard)
  public async deleteUser(@Param('patientId') patientId) {
    return await this.userService.deleteUser(patientId);
  }
  @Put('/update')
  @UseGuards(JwtAuthGuard)
  public async UpdateUser(@Body() userData: UpdateUserDto, @Req() req) {
    return await this.userService.updateUser(userData, req.user._id);
  }

  // //medical history
  // @Get('/medical-history')
  // @UseGuards(JwtAuthGuard)
  // public async getUserMedicalHistories(@Req() req) {
  //   return await this.medicalHistoryService.getUserMedicalHistory(req.user._id);
  // }
  // @Post('/medical-history')
  // @UseGuards(JwtAuthGuard)
  // public async createUserMedicalHistory(
  //   @Body() medicalHistoryDto: MedicalHistoryDto,
  //   @Req() req,
  // ) {
  //   return await this.medicalHistoryService.createUserMedicalHistory(
  //     medicalHistoryDto,
  //     req.user._id,
  //   );
  // }
  // @Put('/medical-history/:medicalHistoryId')
  // @UseGuards(JwtAuthGuard)
  // public async updateUserMedicalHistory(
  //   @Body() medicalHistoryDto: MedicalHistoryDto,
  //   @Param('medicalHistoryId') medicalHistoryId,
  // ) {
  //   return await this.medicalHistoryService.updateUserMedicalHistory(
  //     medicalHistoryDto,
  //     medicalHistoryId,
  //   );
  // }
  // @Delete('/medical-history/:medicalHistoryId')
  // @UseGuards(JwtAuthGuard)
  // public async DeleteUserMedicalHistory(
  //   @Param('medicalHistoryId') medicalHistoryId,
  // ) {
  //   return await this.medicalHistoryService.DeleteUserMedicalHistory(
  //     medicalHistoryId,
  //   );
  // }
  // @Get('/medical-history/:medicalHistoryId')
  // @UseGuards(JwtAuthGuard)
  // public async getUserMedicalHistoryById(
  //   @Param('medicalHistoryId') medicalHistoryId,
  // ) {
  //   return await this.medicalHistoryService.getUserMedicalHistoryById(
  //     medicalHistoryId,
  //   );
  // }
}
