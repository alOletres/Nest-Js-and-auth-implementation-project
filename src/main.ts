import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './create-swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, raw, text, urlencoded } from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
    }),
  );
  // app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.use(json({ limit: '50mb' }));
  app.use(raw({ limit: '50mb' }));
  app.use(text({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  // Increase payload size limit (10MB in this case)
  app.use(bodyParser.json({ limit: '10mb' }));

  createSwaggerDocument(app);

  await app.listen(process.env.DEV_PORT, () =>
    console.log(`Server is running port ${process.env.DEV_PORT}`),
  );
}
bootstrap();
