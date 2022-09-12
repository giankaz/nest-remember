import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // não deixa oq nao estiver no dto passar mas nao estoura erro
      //forbidNonWhitelisted: true, //estoura um erro caso algo não esteja no dto
      transform: true, // transforma as instancias do dto em realmente o que esta no dto
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
}

bootstrap();
