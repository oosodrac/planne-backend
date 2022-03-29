/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Fruta } from "@prisma/client";
import { PrismaService } from './../prisma.service';
import { Prisma } from '@prisma/client';
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { BaldeFrutaService } from "src/balde-fruta/balde-fruta.service";
import { BaldeService } from './../balde/balde.service';

@Injectable()
export class FrutaService {
    constructor(
        private prismaService: PrismaService,
        private schedulerRegistry: SchedulerRegistry,
        private baldeFrutaService: BaldeFrutaService,
        private baldeService: BaldeService ) {}

    async getFrutas(): Promise<Fruta[]> {
        return this.prismaService.fruta.findMany();
    }

    async getFruta(nome: Prisma.FrutaWhereInput): Promise<Fruta> {
        return this.prismaService.fruta.findFirst( {
            where: nome
        } )
    }

    async createFruta(data: Prisma.FrutaCreateInput): Promise<Fruta> {
        return this.prismaService.fruta.create({ data })
    }

    async updateFruta( parmas:{
        where: Prisma.FrutaWhereUniqueInput,
        data: Prisma.FrutaUpdateInput
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

    handleCron( nome, expiracao ) {
        const job = new CronJob( `${expiracao} * * * * *`, () => {

            this.getFruta( { nome: nome } ).then( frutaResult => {
                if ( frutaResult ) {

                    this.deleteFruta( {
                        id: frutaResult.id
                    } ).then( (frutaEliminada) => {

                    this.baldeFrutaService.getBaldeFrutas().then( baldeFrutas => {
                        baldeFrutas.forEach( result => {
                            if ( result.fruta === frutaEliminada.nome ) {
                                this.updateDeposito( result.balde, result.fruta, frutaResult.preco );
                            }
                        } )
                    } );
                });

                } else {
                    this.schedulerRegistry.deleteCronJob( nome );
                    console.log( `Tarefa ${nome} eliminada` );
                }
            } )

            console.log(`time (${expiracao}) for job ${nome} to run!`);
        } )

        this.schedulerRegistry.addCronJob( nome, job );
        job.start();

        console.log( `job ${nome} added for each minute at ${nome} seconds!` );
    }

    updateDeposito(balde, fruta, precoFruta  ) {

        

        const id = balde.concat(fruta);
        this.baldeFrutaService.removeFrutaFromBalde( { id: id } ).then( baldeFrutaRemovido => {
            // actualizar o resumo
            this.baldeFrutaService.getResumoByBaldeName( baldeFrutaRemovido.balde ).then( resumoResult => {
                const total = Number(resumoResult.total) - Number(precoFruta);
                const balde = baldeFrutaRemovido.balde;

                this.baldeService.getBalde( {nome: balde } ).then( baldeResult => {
                    const ocupacao = Number(resumoResult.ocupacao) - Number((100 / baldeResult.capacidade ));
                                            
                this.baldeFrutaService.updateResumoBaldeFruta( {
                    where: { balde: balde },
                    data: {
                        total,
                        balde,
                        ocupacao
                    }
                } ).then( depositoRemovido => {
                    if ( Number(depositoRemovido.ocupacao) === 0 ) {
                        this.baldeFrutaService.removeResumo( { balde: balde } );
                    }
                } );
                } )
            } )
        } );
    }
}