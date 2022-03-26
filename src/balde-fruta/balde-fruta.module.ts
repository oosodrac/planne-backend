/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { BaldeFrutaController } from './balde-fruta.controller';
import { BaldeService } from './../balde/balde.service';
import { FrutaService } from './../fruta/fruta.service';

@Module({
    imports: [SharedModule],
    controllers: [BaldeFrutaController],
    providers: [BaldeService, FrutaService]
})
export class BaldeFrutaModule {}
