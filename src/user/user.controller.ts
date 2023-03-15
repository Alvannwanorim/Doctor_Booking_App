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
import { AddressDto } from './dto/address.dto';
import { AddressService } from './address.service';
import { MedicalHistoryService } from './medical-history.service';
import { FamiliesService } from './families.service';
import { VitalsService } from './vitals.service';
import { VitalsDto } from './dto/vitals.dto';
import { FamiliesDto } from './dto/families.dto';
import { MedicalHistoryDto } from './dto/medical-history.dto';
@Controller('patient')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    private readonly vitalsService: VitalsService,
    private readonly familiesService: FamiliesService,
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

  @Get('/address')
  @UseGuards(JwtAuthGuard)
  public async getUserAddress(@Req() req) {
    return await this.addressService.getUserAddress(req.user._id);
  }
  @Post('/address')
  @UseGuards(JwtAuthGuard)
  public async createUserAddress(@Body() addressDto: AddressDto, @Req() req) {
    return await this.addressService.createUserAddress(
      addressDto,
      req.user._id,
    );
  }
  @Put('/address/:addressId')
  @UseGuards(JwtAuthGuard)
  public async updateUserAddress(
    @Body() addressDto: AddressDto,
    @Param('addressId') addressId,
  ) {
    return await this.addressService.updateUserAddress(addressDto, addressId);
  }
  @Delete('/address/:addressId')
  @UseGuards(JwtAuthGuard)
  public async DeleteUserAddress(@Param('addressId') addressId) {
    return await this.addressService.DeleteUserAddress(addressId);
  }
  @Get('/address/:addressId')
  @UseGuards(JwtAuthGuard)
  public async getUserAddressById(@Param('addressId') addressId) {
    return await this.addressService.getUserAddressById(addressId);
  }

  //vitals
  @Get('/vitals')
  @UseGuards(JwtAuthGuard)
  public async getUserVitals(@Req() req) {
    return await this.vitalsService.getUserVitals(req.user._id);
  }
  @Post('/vitals')
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
    return await this.addressService.getUserAddressById(addressId);
  }

  //families
  @Get('/families')
  @UseGuards(JwtAuthGuard)
  public async getUserFamilies(@Req() req) {
    return await this.familiesService.getUserFamilies(req.user._id);
  }
  @Post('/families')
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
  @Put('/families/:familiesId')
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
  @Delete('/families/:familiesId')
  @UseGuards(JwtAuthGuard)
  public async DeleteUserFamilies(@Param('familiesId') familiesId) {
    return await this.familiesService.DeleteUserFamilies(familiesId);
  }
  @Get('/families/:familiesId')
  @UseGuards(JwtAuthGuard)
  public async getUserFamiliesById(@Param('familiesId') familiesId) {
    return await this.familiesService.getUserFamiliesById(familiesId);
  }

  //medical history
  @Get('/medical-history')
  @UseGuards(JwtAuthGuard)
  public async getUserMedicalHistories(@Req() req) {
    return await this.medicalHistoryService.getUserMedicalHistory(req.user._id);
  }
  @Post('/medical-history')
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
  @Put('/medical-history/:medicalHistoryId')
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
  @Delete('/medical-history/:medicalHistoryId')
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
