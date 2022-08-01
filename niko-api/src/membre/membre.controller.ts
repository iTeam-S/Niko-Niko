import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MembreService } from './membre.service';

@Controller('membre')
export class MembreController {
    constructor(
        private readonly membreService: MembreService
    ) {}

    @UseGuards(AuthGuard('jwtNiko'))
    @Get()
    async getAllMembre() {
        return await this.membreService.findAll();
    }
}
