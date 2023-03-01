import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
    const payload = {
      email: user.email,
      sub: user._id,
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
