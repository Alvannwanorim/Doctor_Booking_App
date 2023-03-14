import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentsModule } from './appointments/appointments.module';

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
    MongooseModule.forRoot(process.env.MONGO_LOCAL),
    UserModule,
    AuthModule,
    DoctorModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
