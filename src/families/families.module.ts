import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from 'src/patient/schema/patient.schema';

import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { Families, FamiliesSchema } from './schema/families.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Families.name, schema: FamiliesSchema },
    ]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
