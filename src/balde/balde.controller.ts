/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Balde } from "@prisma/client";
import { BaldeService } from './balde.service';

@Controller('api/v1/baldes')
export class BaldeController {
    constructor(private baldeService: BaldeService) {}

    @Get()
    async getBaldes(): Promise<Balde[]> {
        return this.baldeService.getBaldes();
    }

    @Get(':nome')
    async getBaldeById(@Param('nome') nome: string ): Promise<Balde> {
        return this.baldeService.getBalde( { nome: nome } );
    }

    @Post()
    async createBalde(@Body() baldeData: { nome: string, capacidade: number }): Promise<Balde> {
        const { nome, capacidade } = baldeData;
        return this.baldeService.createBalde( {
            nome,
            capacidade
        } )
    }

    @Put(':nome')
    async updateBalde(@Param('nome') id: string, @Body() baldeData: { nome: string, capacidade: number  } ): Promise<Balde> {
        const { nome, capacidade } = baldeData;
        return this.baldeService.updateBalde({
            where: { nome: nome },
            data: {
                nome,
                capacidade
            }
        })
    }

    @Delete(':nome')
    async deleteBalde(@Param('nome') nome: string): Promise<Balde> {
        return this.baldeService.deleteBalde( { nome: nome } )
    }
}