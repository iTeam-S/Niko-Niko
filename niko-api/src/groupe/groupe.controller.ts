import { Body, Controller, Get, NotAcceptableException, 
    Patch, 
    Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupeCreateDto, GroupeUpdateDto } from './dto';
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

    @UseGuards(AuthGuard('jwtNiko'))
    @Get()
    async getGroupes(@Request() req: any) {
        return await this.groupeService.find(parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Get('admin/all')
    async getAllGroupes() {
        return await this.groupeService.findAll();
    }

    @UseGuards(AuthGuard('jwtNiko'))
    @Patch('update')
    async updateGroupe(@Body() donnees: GroupeUpdateDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.groupeService.update(donnees);
    }
}
