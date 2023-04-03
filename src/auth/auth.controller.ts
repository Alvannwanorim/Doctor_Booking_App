import { Controller, Req, Post, UseGuards, Get } from '@nestjs/common';
import { ROLES } from 'src/users/types/user.type';
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

  @UseGuards(LocalAuthGuard)
  @Post('/user/login')
  public async login(@Req() req) {
    return await this.authService.loginPatient(req.user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/doctor/login')
  public async loginDoctor(@Req() req) {
    return await this.authService.loginDoctor(req.user);
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

  @Roles(ROLES.PATIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/current-user')
  public async getCurrentUser(@Req() req) {
    return await this.authService.getCurrentUser(req.user._id);
  }
}
