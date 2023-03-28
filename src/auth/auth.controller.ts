import { Controller, Req, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { GoogleAuthGuard } from './guards/google.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

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

  @Get('/current-user')
  @UseGuards(JwtAuthGuard)
  public async getCurrentUser(@Req() req) {
    return await this.authService.getCurrentUser(req.user._id);
  }
}
