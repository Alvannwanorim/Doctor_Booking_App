import { Controller, Req, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schema/user.schema';
import { ROLES } from 'src/user/types/user.types';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { GoogleAuthGuard } from './guards/google.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/register')
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }
  @Post('doctor/register')
  public async createDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
  ): Promise<User> {
    return await this.authService.registerDoctor(createDoctorDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('user/login')
  public async login(@Req() req) {
    return await this.authService.loginUser(req.user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('doctor/login')
  public async loginDoctor(@Req() req) {
    return await this.authService.loginDoctor(req.user);
  }

  @Roles(ROLES.DOCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  public test(@Req() req) {
    return req.user;
  }

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  public handleGoogleLogin() {
    return { mg: 'ok' };
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  public handleGoogleLoginRedirect(@Req() req) {
    const usersDetails = req.user._json;

    const googleData: GoogleAuthDto = {
      email: String(usersDetails.email),
      firstName: String(usersDetails.given_name),
      lastName: String(usersDetails.given_name),
    };
    return this.authService.createUserByGoogleAuth(googleData);
  }
}
