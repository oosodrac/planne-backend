/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Balde, Prisma } from '@prisma/client';
import { BaldeFrutaService } from 'src/balde-fruta/balde-fruta.service';
import { PrismaService } from './../prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BaldeService {
  constructor(private prismaService: PrismaService, private baldeFrutaService: BaldeFrutaService) {}

  async getBaldes(): Promise<Balde[]> {
      return this.prismaService.balde.findMany();
  }

  async getBalde(nome: Prisma.BaldeWhereUniqueInput): Promise<Balde | null> {
    return this.prismaService.balde.findUnique({
      where: nome,
    });
  }

  async createBalde(data: Prisma.BaldeCreateInput ): Promise<Balde> {
      return this.prismaService.balde.create({
          data,
      })
  }

  async updateBalde(params: {
      where: Prisma.BaldeWhereUniqueInput;
      data: Prisma.BaldeUpdateInput;
  }): Promise<Balde> {
      const { where, data } = params;
      return this.prismaService.balde.update({
          data,
          where
      })
  }

  async deleteBalde(where: Prisma.BaldeWhereUniqueInput): Promise<Balde> {
      let result;
    this.baldeFrutaService.getResumoByBaldeName( where.nome ).then( resumo => {
        if ( Number(resumo.ocupacao) !== Number(0) ) {
            throw new NotFoundException("O balde contem frutas");
        } else {
            result = this.prismaService.balde.delete({
                where,
            })
        }
    } )

      return result;
  }


}
