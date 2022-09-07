import { Body, Controller, Get, NotAcceptableException, Param, Post, 
    Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HumeurCreateDto } from './dto';
import { HumeurService } from './humeur.service';

@ApiBearerAuth()
@Controller('humeur')
export class HumeurController {
    constructor(
        private readonly humeurService: HumeurService
    ) {}

    @UseGuards(AuthGuard('jwtNiko'))
    @Post('create')
    async createHumeur(@Body() donnees: HumeurCreateDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.humeurService.create(parseInt(req.user.id), donnees);
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Get('membre/:id')
    async getByMembre(@Param() donnees: { id: number }, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.humeurService.findBymembre(parseInt(req.user.id), donnees);
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Get('groupe/:id')
    async getByGroupe(@Param() donnees: { id: number }, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.humeurService.findByGroupe(parseInt(req.user.id), donnees);
    }
}
