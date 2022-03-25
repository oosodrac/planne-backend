/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { FrutaController } from './fruta.controller';
import { FrutaService } from './fruta.service';

@Module({
    imports: [SharedModule],
    controllers: [FrutaController],
    providers: [FrutaService]
})
export class FrutaModule {}
