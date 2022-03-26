/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Fruta } from "@prisma/client";
import { PrismaService } from './../prisma.service';
import { Prisma } from '@prisma/client';
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { CronExpression } from '@nestjs/schedule';

@Injectable()
export class FrutaService {
    constructor(private prismaService: PrismaService, private schedulerRegistry: SchedulerRegistry) {}

    async getFrutas(): Promise<Fruta[]> {
        return this.prismaService.fruta.findMany();
    }

    async getFruta(nome: Prisma.FrutaWhereUniqueInput): Promise<Fruta> {
        return this.prismaService.fruta.findUnique( {
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

    handleCron( name: string, seconds: number ) {
        const job = new CronJob( `${seconds} * * * * *`, () => {
            console.log(`time (${seconds}) for job ${name} to run!`);
        } )

        this.schedulerRegistry.addCronJob( name, job );
        job.start();

        console.log( `job ${name} added for each minute at ${seconds} seconds!` );
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // getCrons() {
    //     const jobs = this.schedulerRegistry.getCronJobs();
    //     jobs.forEach((value, key, map) => {
    //       let next;
    //       try {
    //         next = value.nextDates().toDate();
    //       } catch (e) {
    //         next = 'error: next fire date is in the past!';
    //       }
    //       console.log(`job: ${value} -> next: ${next}`);
    //     });
    //   }
}