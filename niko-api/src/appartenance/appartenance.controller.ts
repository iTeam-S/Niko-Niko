import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppartenanceService } from './appartenance.service';
import { AppartenanceCreateDto } from './dto';

@ApiBearerAuth()
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
    async getAppartenanceGroupe(@Param() donnees: { id: number }) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.appartenanceService.findByGroupe(donnees);
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Get('membre-groupe')
    async getAppartenance(@Request() req: any) {
        return await this.appartenanceService.findByMembre(parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Delete('delete/:id')
    async removeAppartenance(@Param() donnees: { id: number }) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.appartenanceService.remove(donnees);
    }
}
