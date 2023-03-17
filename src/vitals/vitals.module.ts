import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, USerSchema } from 'src/user/schema/user.schema';
import { Vitals, VitalsSchema } from './schema/vitals.schema';
import { VitalsController } from './vitals.controller';
import { VitalsService } from './vitals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: USerSchema },
      { name: Vitals.name, schema: VitalsSchema },
    ]),
  ],
  controllers: [VitalsController],
  providers: [VitalsService],
})
export class VitalsModule {}
