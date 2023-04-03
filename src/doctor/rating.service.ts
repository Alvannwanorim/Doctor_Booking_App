import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { RatingDto } from './dto/rating.dto';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import { Rating, RatingDocument } from './schema/rating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  public async createNewRating(ratingDto: RatingDto, patientId: string) {
    const doctor_id = new mongoose.Types.ObjectId(ratingDto.doctor);
    const patient_id = new mongoose.Types.ObjectId(patientId);
    const doctor = await this.doctorModel.findById(ratingDto.doctor);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const existingRating = await this.ratingModel.findOne({
      patient: patient_id,
      doctor: doctor_id,
    });
    if (existingRating) {
      return existingRating;
    }
    const newRating = new this.ratingModel({
      patient: patient_id,
      ...ratingDto,
    });

    await newRating.save();

    const allRating = await this.ratingModel.find({
      doctor: doctor_id,
    });

    const ratingCount = await this.ratingModel
      .find({
        doctor: doctor_id,
      })
      .count();

    const finalRating =
      allRating.reduce((acc, item) => acc + item.rating, 0) / ratingCount;

    doctor.rating = finalRating;
    await doctor.save();
    return newRating;
  }
  public async updateDoctorRating(doctorId: string) {
    const doctor_id = new mongoose.Types.ObjectId(doctorId);
    const doctor = await this.doctorModel.findById(doctorId);

    const allRating = await this.ratingModel.find({
      doctor: doctor_id,
    });

    const ratingCount = await this.ratingModel
      .find({
        doctor: doctor_id,
      })
      .count();

    const finalRating =
      allRating.reduce((acc, item) => acc + item.rating, 0) / ratingCount;

    doctor.rating = finalRating;
    await doctor.save();
    return doctor;
  }
  public async getDoctorRating(doctorId: string) {
    const doctor_id = new mongoose.Types.ObjectId(doctorId);
    const doctorRating = this.ratingModel.find({ doctor: doctor_id });
    return doctorRating;
  }

  public async getAllRatings() {
    const ratings = await this.ratingModel.find({}).sort({ rating: 'desc' });
    return ratings;
  }
}
