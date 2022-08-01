import { Body, Controller, Get, NotAcceptableException, Param, Post, UseGuards } from '@nestjs/common';
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
    @Get(':id')
    async getAppartenance(@Param() groupe_id: number) {
        if(!groupe_id) throw new NotAcceptableException("Credentials incorrects !");
        return await this.appartenanceService.findByGroupe(groupe_id);
    }
}
