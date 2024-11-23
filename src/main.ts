import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggingService } from './logging/logging.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new LoggingService();

  process.on('uncaughtException', (err: Error) => {
    logger.error(`Uncaught exception: ${err.message}`, err.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.error(`Unhandled rejection at: ${promise}, reason: ${reason}`);
    process.exit(1);
  });

  const port = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Manage users, artists, tracks, albums, and favorites')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
