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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

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
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
