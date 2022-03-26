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

    @Get(':id')
    async getBaldeById(@Param('id') id: string ): Promise<Balde> {
        return this.baldeService.getBalde( { id: Number(id) } );
    }

    @Post()
    async createBalde(@Body() baldeData: { nome: string, capacidade: number }): Promise<Balde> {
        const { nome, capacidade } = baldeData;
        return this.baldeService.createBalde( {
            nome,
            capacidade
        } )
    }

    @Put(':id')
    async updateBalde(@Param('id') id: string, @Body() baldeData: { nome: string, capacidade: number  } ): Promise<Balde> {
        const { nome, capacidade } = baldeData;
        return this.baldeService.updateBalde({
            where: { id: Number(id) },
            data: {
                nome,
                capacidade
            }
        })
    }

    @Delete(':id')
    async deleteBalde(@Param('id') id: string): Promise<Balde> {
        return this.baldeService.deleteBalde( { id: Number(id) } )
    }
}