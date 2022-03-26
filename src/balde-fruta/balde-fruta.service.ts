/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { BaldeFruta, Prisma, ResumoBalda } from '@prisma/client';

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

    // async removeFrutaFromBalde( balde: string, fruta: string ): Promise<BaldeFruta> {
    //     const id = balde.concat(fruta);
    //     return this.prismaService.baldeFruta.delete( {
    //         where: {
    //             id: id
    //         }
    //     } )
    // }

    async getBaldeFrutas(): Promise<BaldeFruta[]> {
        return this.prismaService.baldeFruta.findMany({});
    }

    async createResumoBaldeFruta( data: Prisma.ResumoBaldaCreateInput ): Promise<ResumoBalda> {
        return this.prismaService.resumoBalda.create( { data, } )
    }

    async updateResumoBaldeFruta( 
        params: {
            where: Prisma.ResumoBaldaWhereUniqueInput
            data: Prisma.ResumoBaldaUpdateInput
        }
     ): Promise<ResumoBalda> {
        const { where, data } = params;
        return this.prismaService.resumoBalda.update( { data, where } )
    }

    async getResumoByBaldeName( balde: string ): Promise<ResumoBalda> {
        return this.prismaService.resumoBalda.findFirst( {
            where: {
                balde: balde
            }
        } );
    }

    async getResumoBaldeFruta(): Promise<ResumoBalda[]> {
        return this.prismaService.resumoBalda.findMany(
            {
                orderBy: [
                    {
                        ocupacao: 'desc'
                    }
                ]
            }
        );
    }
}
