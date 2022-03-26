/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { FrutaController } from './fruta.controller';
import { FrutaService } from './fruta.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [SharedModule, ScheduleModule.forRoot()],
controllers: [FrutaController],
    providers: [FrutaService]
})
export class FrutaModule {}
