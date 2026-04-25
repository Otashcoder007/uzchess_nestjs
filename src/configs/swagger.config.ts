import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const configureSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('UzChess')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const docs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, docs, {
    swaggerOptions: { persistAuthorization: true },
  });
};
