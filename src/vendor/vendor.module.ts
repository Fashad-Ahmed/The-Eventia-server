import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorController } from './vendor.controller';
import { VendorSchema } from './vendor.model';
import { VendorService } from './vendor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
