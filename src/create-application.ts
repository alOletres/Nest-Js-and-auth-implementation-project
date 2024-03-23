import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const createStandaloneApplication = async (
  options: NestApplicationContextOptions,
) => {
  const app = await NestFactory.createApplicationContext(AppModule, options);

  return app;
};
