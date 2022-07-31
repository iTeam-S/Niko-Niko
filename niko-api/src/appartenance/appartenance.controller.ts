import { Body, Controller, NotAcceptableException, Post, UseGuards } from '@nestjs/common';
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
}
