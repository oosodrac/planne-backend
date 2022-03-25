/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Balde } from "@prisma/client";
import { BaldeService } from './balde.service';

@Controller()
export class BaldeController {
    constructor(private baldeService: BaldeService) {}

    @Get('baldes/:id')
    async getBaldeById(@Param('id') id: number ): Promise<Balde> {
        return this.baldeService.getBalde( {id} );
    }

    @Post('baldes')
    async createBalde(@Body() baldeData: { nome: string, capacidade: number }): Promise<Balde> {
        const { nome, capacidade } = baldeData;
        return this.baldeService.createBalde( {
            nome,
            capacidade
        } )
    }

    @Put('baldes/:id')
    async updateBalde(@Param('id') id: number, @Body() baldeData: { nome: string, capacidade: number  } ): Promise<Balde> {
        const { nome, capacidade } = baldeData;
        return this.baldeService.updateBalde({
            where: { id },
            data: {
                nome,
                capacidade
            }
        })
    }

    @Delete('baldes/:id')
    async deleteBalde(@Param('id') id: number): Promise<Balde> {
        return this.baldeService.deleteBalde( { id } )
    }
}