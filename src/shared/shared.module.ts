/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BaldeFrutaService } from 'src/balde-fruta/balde-fruta.service';
import { PrismaService } from './../prisma.service';

@Module({
    exports: [PrismaService, BaldeFrutaService],
    providers: [PrismaService, BaldeFrutaService]
})
export class SharedModule {}
