import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schema/wallet.schema';
import { PatientModule } from 'src/patient/patient.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    PatientModule,
    DoctorModule,
    UsersModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
