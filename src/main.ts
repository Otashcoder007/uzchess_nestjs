import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalFilter } from './core/filters/global-filter';
import { configureSwagger } from './configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configureSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(morgan('dev'));
  app.useGlobalFilters(new GlobalFilter());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
