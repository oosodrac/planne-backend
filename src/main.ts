import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.$disconnect();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
