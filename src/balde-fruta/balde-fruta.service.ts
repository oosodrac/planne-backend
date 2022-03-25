/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { BaldeFruta, Prisma } from '@prisma/client';

@Injectable()
export class BaldeFrutaService {
    constructor(private prismaService: PrismaService) {}

    async addFrutaToBalde( data: Prisma.BaldeFrutaCreateInput ): Promise<BaldeFruta> {
        return this.prismaService.baldeFruta.create( {
            data,
        } )
    }

    async removeFrutaFromBalde( where: Prisma.BaldeFrutaWhereUniqueInput ): Promise<BaldeFruta> {
        return this.prismaService.baldeFruta.delete( {
            where: where
        } )
    }

    async getBaldeFrutas(balde: string): Promise<BaldeFruta[]> {
        return this.prismaService.baldeFruta.findMany({
            where: {
                AND: [
                    {
                        balde: balde
                    }
                ]
            },
        });
    }
}
