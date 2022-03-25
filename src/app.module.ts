import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FrutaModule } from './fruta/fruta.module';
import { SharedModule } from './shared/shared.module';
import { BaldeModule } from './balde/balde.module';
import { BaldeFrutaModule } from './balde-fruta/balde-fruta.module';

@Module({
  imports: [FrutaModule, SharedModule, BaldeModule, BaldeFrutaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
