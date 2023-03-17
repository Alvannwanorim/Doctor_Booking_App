import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, USerSchema } from 'src/user/schema/user.schema';
import { DeliveryAddressController } from './delivery-address.controller';
import { DeliveryAddressService } from './delivery-address.service';
import {
  DeliveryAddress,
  DeliveryAddressSchema,
} from './schema/addresses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: USerSchema },
      { name: DeliveryAddress.name, schema: DeliveryAddressSchema },
    ]),
  ],
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService],
})
export class DeliveryAddressModule {}
