import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from 'src/doctor/doctor.module';
import { Doctor, DoctorSchema } from 'src/doctor/schema/doctor.schema';
import { User, USerSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: USerSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
    DoctorModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
