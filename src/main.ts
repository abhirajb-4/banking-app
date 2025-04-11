import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API for managing user registrations')
    .setVersion('1.0')
    .addTag('users') // Optional: Group endpoints by tags
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Serve docs at `/api`


  await app.listen(3000);
}
bootstrap();
