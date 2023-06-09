import { Module } from '@nestjs/common';
import { BankDetailsController } from './bank-details.controller';
import { BankDetailsService } from './bank-details.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BankDetails, BankDetailsSchema } from './schema/bank-details.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankDetails.name, schema: BankDetailsSchema },
    ]),
    UsersModule,
  ],
  controllers: [BankDetailsController],
  providers: [BankDetailsService],
})
export class BankDetailsModule {}
