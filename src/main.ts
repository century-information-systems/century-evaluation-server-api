import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Prefix
  app.setGlobalPrefix('api');

  // Enable CORS
  app.enableCors();

  // Set Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Register Prisma Shutdown Hooks
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  // Swagger / Open API
  const docsConfig = new DocumentBuilder()
    .setTitle('Century Evaluation Server API')
    .setDescription('The Century Evaluation Server API documentation')
    .setVersion('1.0')
    .addTag('century')
    .build();
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Century Evaluation Server API Docs',
  });

  // Start !!!
  await app.listen(3232);
}
bootstrap();
