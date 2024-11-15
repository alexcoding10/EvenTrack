import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();  // Esto cargará las variables del archivo .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3030
  app.enableCors()
  await app.listen(port);
  // Imprimir la URL de la aplicación en la consola
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
