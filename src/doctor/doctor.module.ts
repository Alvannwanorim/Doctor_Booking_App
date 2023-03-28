import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { Doctor, DoctorSchema } from './schema/doctor.schema';
import { Rating, RatingSchema } from './schema/rating.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: Rating.name, schema: RatingSchema },
    ]),
    UsersModule,
  ],
  controllers: [DoctorController, RatingController],
  providers: [DoctorService, RatingService],
  exports: [DoctorService, MongooseModule],
})
export class DoctorModule {}
