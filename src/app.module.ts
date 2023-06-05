import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DeliveryAddressModule } from './delivery-address/delivery-address.module';
import { VitalsModule } from './vitals/vitals.module';
import { FamiliesModule } from './families/families.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { PatientModule } from './patient/patient.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { WalletModule } from './wallet/wallet.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './upload',
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'telidoc',
    }),
    MongooseModule.forRoot(process.env.MONGO_ATLAS),
    PatientModule,
    AuthModule,
    DoctorModule,
    AppointmentsModule,
    DeliveryAddressModule,
    VitalsModule,
    FamiliesModule,
    MedicalHistoryModule,
    UsersModule,
    ChatModule,
    WalletModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
