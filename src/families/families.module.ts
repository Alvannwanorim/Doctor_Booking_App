import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, USerSchema } from 'src/user/schema/user.schema';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { Families, FamiliesSchema } from './schema/families.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: USerSchema },
      { name: Families.name, schema: FamiliesSchema },
    ]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
