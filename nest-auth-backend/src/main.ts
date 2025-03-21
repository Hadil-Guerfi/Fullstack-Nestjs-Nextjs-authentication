import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const port: number = configService.get<number>('PORT');
  app.enableCors();

  await app.listen(port);
}
bootstrap();
