import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()

  .setTitle('Ecommerce')
  .setDescription('Projeto integrador feito na Generation.')
  .setContact('Ecommerce integrador', 'https://github.com/Ronald0Freire/ecommerce', '')
  .setVersion('2.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/Swagger', app, document)

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
