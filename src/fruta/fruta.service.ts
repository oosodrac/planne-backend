/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Fruta } from "@prisma/client";
import { PrismaService } from './../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FrutaService {
    constructor(private prismaService: PrismaService) {}

    async getFrutas(): Promise<Fruta[]> {
        return this.prismaService.fruta.findMany();
    }

    async getFruta(id: Prisma.FrutaWhereUniqueInput): Promise<Fruta> {
        return this.prismaService.fruta.findUnique( {
            where: id
        } )
    }

    async createFruta(data: Prisma.FrutaCreateInput): Promise<Fruta> {
        return this.prismaService.fruta.create({ data })
    }

    async updateFruta( parmas:{
        where: Prisma.FrutaWhereUniqueInput,
        data: Prisma.FrutaUpdateArgs
    } ): Promise<Fruta> {
        const { where, data } = parmas;
        return this.prismaService.fruta.update( {
            where,
            data,
        } )
    }

    async deleteFruta( where: Prisma.FrutaWhereUniqueInput ): Promise<Fruta> {
        return this.prismaService.fruta.delete( { where } )
    }
}