import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS so frontend can call backend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Next.js dev servers
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
