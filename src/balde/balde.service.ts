/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Balde, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';

@Injectable()
export class BaldeService {
  constructor(private prismaService: PrismaService) {}

  async getBaldes(): Promise<Balde[]> {
      return this.prismaService.balde.findMany();
  }

  async getBalde(id: Prisma.BaldeWhereUniqueInput): Promise<Balde | null> {
    return this.prismaService.balde.findUnique({
      where: id,
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
      return this.prismaService.balde.delete({
          where,
      })
  }


}
