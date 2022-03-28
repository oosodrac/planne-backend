/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Sse, MessageEvent } from '@nestjs/common';
import { BaldeFrutaService } from './balde-fruta.service';
import { Post } from '@nestjs/common';
import { BaldeFruta, ResumoBalda } from '@prisma/client';
import { BaldeService } from './../balde/balde.service';
import { FrutaService } from './../fruta/fruta.service';
import { asyncScheduler, defer, from, interval, map, Observable, switchMap } from 'rxjs';

@Controller('api/v1/balde-frutas')
export class BaldeFrutaController {
    constructor(private baldeFrutaService: BaldeFrutaService, private baldeService: BaldeService,
        private frutaService: FrutaService) { }

    @Post()
    async depositarFrutaBalde(@Body() dataBaldeFruta: {
        balde: string
        fruta: string
    }): Promise<BaldeFruta> {
        let resultado;
        const { balde, fruta } = dataBaldeFruta;
        const id = balde.concat(fruta);

        const baldeResult = (await this.baldeService.getBalde({ nome: balde }));
        const frutaResult = (await this.frutaService.getFruta({ nome: fruta }));

        // if ( baldeResult == null || frutaResult == null ) {
        //     throw new NotFoundException("Fruta ou Balde não existem");
        // } 
        // else {
        this.baldeFrutaService.getResumoByBaldeName(balde).then(resumo => {

            if (resumo === null || resumo) {
                resultado = this.addFrutaBalde(balde, fruta, id, frutaResult, baldeResult);
            } else if (Number(resumo.ocupacao) === Number(100)) {
                throw new NotFoundException("O Balde está cheio");
            }
        })
        // }

        return resultado;
    }

    private addFrutaBalde(balde, fruta, id, frutaResult, baldeResult) {
        let resultado;
        this.baldeFrutaService.addFrutaToBalde({
            balde,
            fruta,
            id: id
        }).then((result) => {
            console.log('Result', result);
            this.baldeFrutaService.getResumoByBaldeName(balde).then(async resumo => {
                console.log('Resumo', resumo);
                if (resumo === null) {
                    console.log('Balde não existe');
                    const total = Number(frutaResult.preco);
                    const ocupacao = (100 / baldeResult.capacidade);

                    await this.baldeFrutaService.createResumoBaldeFruta({
                        total,
                        balde,
                        ocupacao
                    });

                } else {
                    console.log('Balde ja existe');
                    const total = Number(resumo.total) + Number(frutaResult.preco);
                    const ocupacao = Number((100 / baldeResult.capacidade)) + Number(resumo.ocupacao);

                    await this.baldeFrutaService.updateResumoBaldeFruta({
                        where: { balde: balde },
                        data: {
                            total,
                            balde,
                            ocupacao
                        }
                    });
                }
            });

            resultado = result;
        });

        return resultado;
    }

    @Get()
    async getFrutasFromBalde(): Promise<BaldeFruta[]> {
        return this.baldeFrutaService.getBaldeFrutas();
    }

    @Delete(':balde/:fruta')
    async deleteFrutaFromBalde(@Param('balde') balde: string, @Param('fruta') fruta: string): Promise<BaldeFruta> {
        const id = balde.concat(fruta);
        return this.baldeFrutaService.removeFrutaFromBalde({ id: id });
    }

    @Get('resumo')
    async getResumoBaldeFruta(): Promise<ResumoBalda[]> {
        return this.baldeFrutaService.getResumoBaldeFruta();
    }

    @Get('resumo/balde/:nome')
    async getResumoBaldeFrutaByName(@Param('nome') nome: string): Promise<ResumoBalda> {
        return this.baldeFrutaService.getResumoByBaldeName( nome );
    }

    @Sse('sse-resumo')
    sse(): Observable<any> {

        const data$ = defer( () => from( this.baldeFrutaService.getResumoBaldeFruta() )
        .pipe( map( (response) => ({ data: response }) ) ) );

        return interval(1000).pipe( switchMap(() => data$) );
    }
}
