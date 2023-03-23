import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { JwtDto } from './dto/jwt.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schema/user.schema';
import { ROLES } from 'src/users/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description Fetches User records from the database
   * @param email
   * @param password
   * @returns `User`
   */
  public async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.validateUser(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Incorrect User credentials');
    return user;
  }

  /**
   * @description Fetches User records from the database
   * @param email
   * @param password
   * @returns `User`
   */
  public async validateByEmail(email: string): Promise<User | null> {
    const User = await this.userService.validateUser(email);
    if (!User) {
      return null;
    }
    return User;
  }

  /**
   * @description generates `access_token` for a verified User
   * @param User of type `User`
   * @returns `access_token`
   */
  async loginPatient(user: User): Promise<{ access_token: string }> {
    if (user.roles !== ROLES.PATIENT) {
      throw new UnauthorizedException();
    }
    const payload: JwtDto = {
      email: user.email,
      sub: String(user._id),
    };
    const access_token = this.signToken(payload);
    return { access_token };
  }
  async loginDoctor(user: User): Promise<{ access_token: string }> {
    if (user.roles !== ROLES.DOCTOR) {
      throw new UnauthorizedException();
    }
    const payload: JwtDto = {
      email: user.email,
      sub: String(user._id),
    };
    const access_token = this.signToken(payload);
    return { access_token };
  }

  signToken(payload: JwtDto) {
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return access_token;
  }

  public async createUserByGoogleAuth(googleData: GoogleAuthDto) {
    const User = await this.userService.createUserByGoogleAuth(googleData);
    return this.loginPatient(User);
  }

  public getCurrentUser(UserId: string) {
    return this.userService.getCurrentUser(UserId);
  }
}
