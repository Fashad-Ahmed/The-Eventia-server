import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from 'src/admin/admin.model';
import { VendorController } from './vendor.controller';
import { VendorSchema } from './vendor.model';
import { VendorService } from './vendor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vendor', schema: VendorSchema },
      { name: 'Admin', schema: AdminSchema },
    ]),
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
