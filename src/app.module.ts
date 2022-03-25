import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BaldeService } from './balde/balde.service';
import { BaldeController } from './balde/balde.controller';

@Module({
  imports: [],
  controllers: [AppController, BaldeController],
  providers: [AppService, PrismaService, BaldeService],
})
export class AppModule {}
