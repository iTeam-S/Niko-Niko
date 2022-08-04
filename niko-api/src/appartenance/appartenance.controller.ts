import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppartenanceService } from './appartenance.service';
import { AppartenanceCreateDto } from './dto';

@Controller('appartenance')
export class AppartenanceController {
    constructor(
        private readonly appartenanceService: AppartenanceService
    ) {}

    @UseGuards(AuthGuard('jwtNiko'))
    @Post('create')
    async createAppartenance(@Body() donnees: AppartenanceCreateDto) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.appartenanceService.create(donnees);
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Get('groupe/:id')
    async getAppartenance(@Param() donnees: { id: number }) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.appartenanceService.findByGroupe(donnees);
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Delete('delete/:id')
    async removeAppartenance(@Param() donnees: { id: number }) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.appartenanceService.remove(donnees);
    }
}
