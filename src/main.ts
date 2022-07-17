import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('The Eventia API Documentation ')
    .setDescription('@FashadAhmed')
    .setVersion('v-1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apiDocs', app, document);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
// http://localhost:3002/apiDocs#/
