import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import config from './config/keys';
import { EventModule } from './event/event.module';
import { VendorModule } from './vendor/vendor.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    AuthModule,
    AdminModule,
    PaymentModule,
    EventModule,
    VendorModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
