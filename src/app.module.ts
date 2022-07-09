import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import config from './config/keys';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), AuthModule, AdminModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
