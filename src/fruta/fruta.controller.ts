/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Fruta } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { FrutaService } from './fruta.service';

@Controller('api/v1/frutas')
export class FrutaController {
  constructor(private frutaService: FrutaService) {}
  
  @Get()
  async getFrutas(): Promise<Fruta[]> {
      return this.frutaService.getFrutas();
  }

  @Get(':nome')
  async getFruta(@Param('nome') nome: string): Promise<Fruta> {
      return this.frutaService.getFruta( {
          nome: nome
      } )
  }

  @Post()
  async createFruta( @Body() frutaData: { nome: string, preco: Decimal, expiracao: number } ): Promise<Fruta> {
      const { nome, preco, expiracao } = frutaData;
      return this.frutaService.createFruta({
          nome,
          preco,
          expiracao
      })
  }
  
  @Put(':nome')
  async updateFruta( @Param('nome') nome: string, @Body() frutaData: { preco: Decimal, expiracao: number } ): Promise<Fruta> {
      const { preco, expiracao } = frutaData;
      return this.frutaService.updateFruta( {
          where: { nome: nome },
          data: {
              nome,
              preco,
              expiracao
          }
      } )
  }

  @Delete(':nome')
  async deleteFruta(@Param('nome') nome: string ): Promise<Fruta> {
      return this.frutaService.deleteFruta( { nome: nome } )
  }
}