import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { JwtDto } from './dto/jwt.dto';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { Doctor } from 'src/doctor/schema/doctor.schema';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description Fetches user records from the database
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
    if (!isMatch) throw new BadRequestException('Incorrect user credentials');
    return user;
  }

  /**
   * @description Fetches user records from the database
   * @param email
   * @param password
   * @returns `User`
   */
  public async validateByEmail(email: string): Promise<User | null> {
    const user = await this.userService.validateUser(email);
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * @description generates `access_token` for a verified user
   * @param user of type `User`
   * @returns `access_token`
   */
  async login(user: User): Promise<{ access_token: string }> {
    const payload: JwtDto = {
      email: user.email,
      sub: user._id,
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

  /**
   * Save user information to database
   * @param userDto docs to be saved. Must not be `CreateUserDto`
   * @returns `User`
   * @author Alvan
   */
  public async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.register(createUserDto);
  }

  public async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return await this.userService.updatePassword(updatePasswordDto);
  }

  public async createUserByGoogleAuth(googleData: GoogleAuthDto) {
    const user = await this.userService.createUserByGoogleAuth(googleData);
    return this.login(user);
  }

  public async registerDoctor(
    createDoctorDto: CreateDoctorDto,
  ): Promise<Doctor> {
    const user = await this.userService.register({
      firstName: createDoctorDto.firstName,
      lastName: createDoctorDto.lastName,
      email: createDoctorDto.email,
      password: createDoctorDto.password,
      phoneNumber: createDoctorDto.phoneNumber,
    });

    delete createDoctorDto.firstName;
    delete createDoctorDto.lastName;
    delete createDoctorDto.email;
    delete createDoctorDto.password;
    delete createDoctorDto.phoneNumber;

    const doctor = await this.doctorService.createDoctor(
      user._id,
      createDoctorDto,
    );
    return doctor;
  }
}
