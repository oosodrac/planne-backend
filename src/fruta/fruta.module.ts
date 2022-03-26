/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { FrutaController } from './fruta.controller';
import { FrutaService } from './fruta.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BaldeService } from './../balde/balde.service';

@Module({
    imports: [SharedModule, ScheduleModule.forRoot()],
controllers: [FrutaController],
    providers: [FrutaService, BaldeService]
})
export class FrutaModule {}
