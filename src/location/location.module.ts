import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationSchema } from './location.model';
import { AdminSchema } from 'src/admin/admin.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Location', schema: LocationSchema },
      { name: 'Admin', schema: AdminSchema },
    ]),
  ],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
