import { Body, Controller, NotAcceptableException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupeCreateDto } from './dto';
import { GroupeService } from './groupe.service';

@Controller('groupe')
export class GroupeController {
    constructor(
        private readonly groupeService: GroupeService 
    ) {}

    @UseGuards(AuthGuard('jwtNiko'))
    @Post('create')
    async createGroupe(@Body() donnees: GroupeCreateDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.groupeService.create(parseInt(req.user.id), donnees);
    }
}
