import { Body, Controller, NotAcceptableException, Post, Request, UseGuards } from '@nestjs/common';
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
}
