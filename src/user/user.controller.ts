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
@Controller('patient')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
