import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Save user information to database
   * @param userDto docs to be saved. Must not be `CreateUserDto`
   * @returns `User`
   * @author Alvan
   */
  public async register(userDto: CreateUserDto): Promise<User | null> {
    const existingUser = this.userModel.findOne({ email: userDto.email });

    if (existingUser) throw new BadGatewayException('User already exists');

    const user = new this.userModel({ ...userDto });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return user;
  }

  /**
   * Retrieves a single User from the database
   * @param email must be a valid email that exists in the database
   * @returns `User`
   * @author Alvan
   */
  public async validateUser(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email });
    if (!user) return null;
    return user;
  }
}
