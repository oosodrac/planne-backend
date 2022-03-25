/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param } from '@nestjs/common';
import { BaldeFrutaService } from './balde-fruta.service';
import { Post } from '@nestjs/common';
import { BaldeFruta } from '@prisma/client';

@Controller('api/v1/balde-frutas')
export class BaldeFrutaController {
    constructor(private baldeFrutaService: BaldeFrutaService) { }

    @Post()
    async depositarFrutaBalde(@Body() dataBaldeFruta: {
        balde: string
        fruta: string
    }): Promise<BaldeFruta> {
        const { balde, fruta } = dataBaldeFruta;
        const id = balde.concat(fruta);

        return this.baldeFrutaService.addFrutaToBalde({
            balde,
            fruta,
            id: id
        })
    }

    @Get(':balde/:fruta')
    async getFrutasFromBalde(@Param('balde') balde: string, @Param('fruta') fruta: string ): Promise<BaldeFruta[]> {
        const id = balde.concat(fruta);
        return this.baldeFrutaService.getBaldeFrutas(id);
    }
}
