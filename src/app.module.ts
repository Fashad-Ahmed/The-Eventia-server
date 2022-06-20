import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
