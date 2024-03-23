import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const createSwaggerDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Oletres [Mid Level Applicant]')
    .setDescription('Coding Exam in SunAsterisk')
    .setVersion('1.0')
    .addTag('Take Home Projects API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
