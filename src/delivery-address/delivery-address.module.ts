import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from 'src/patient/schema/patient.schema';
import { DeliveryAddressController } from './delivery-address.controller';
import { DeliveryAddressService } from './delivery-address.service';
import {
  DeliveryAddress,
  DeliveryAddressSchema,
} from './schema/addresses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: DeliveryAddress.name, schema: DeliveryAddressSchema },
    ]),
  ],
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService],
})
export class DeliveryAddressModule {}
