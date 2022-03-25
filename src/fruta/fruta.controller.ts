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

  @Get(':id')
  async getFruta(@Param('id') id: string): Promise<Fruta> {
      return this.frutaService.getFruta( {
          id: Number(id)
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
  
  @Put(':id')
  async updateFruta( @Param('id') id: string, @Body() frutaData: { nome: string, preco: Decimal, expiracao: number } ): Promise<Fruta> {
      const { nome, preco, expiracao } = frutaData;
      return this.frutaService.updateFruta( {
          where: { id: Number(id) },
          data: {
              nome,
              preco,
              expiracao
          }
      } )
  }

  @Delete(':id')
  async deleteFruta(@Param('id') id: string ): Promise<Fruta> {
      return this.frutaService.deleteFruta( { id: Number(id) } )
  }
}