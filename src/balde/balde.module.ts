/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { BaldeController } from './balde.controller';
import { BaldeService } from './balde.service';
import { BaldeFrutaService } from './../balde-fruta/balde-fruta.service';

@Module({
    imports: [SharedModule],
    controllers: [BaldeController],
    providers: [BaldeService, BaldeFrutaService]
})

export class BaldeModule {}
