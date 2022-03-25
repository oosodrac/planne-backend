/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { BaldeFrutaController } from './balde-fruta.controller';
import { BaldeFrutaService } from './balde-fruta.service';

@Module({
    imports: [SharedModule],
    controllers: [BaldeFrutaController],
    providers: [BaldeFrutaService]
})
export class BaldeFrutaModule {}
