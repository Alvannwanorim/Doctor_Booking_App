import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { Doctor, DoctorSchema } from './schema/doctor.schema';
import { Rating, RatingSchema } from './schema/rating.schema';
import { Availability, AvailabilitySchema } from './schema/availability.schema';
import { AvailabilityController } from './availability.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: Rating.name, schema: RatingSchema },
      { name: Availability.name, schema: AvailabilitySchema },
    ]),
    UsersModule,
  ],
  controllers: [DoctorController, RatingController, AvailabilityController],
  providers: [DoctorService, RatingService],
  exports: [DoctorService, MongooseModule],
})
export class DoctorModule {}
