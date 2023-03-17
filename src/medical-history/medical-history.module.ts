import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, USerSchema } from 'src/user/schema/user.schema';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistoryService } from './medical-history.service';
import {
  MedicalHistory,
  MedicalHistorySchema,
} from './schema/medical-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: USerSchema },
      { name: MedicalHistory.name, schema: MedicalHistorySchema },
    ]),
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
