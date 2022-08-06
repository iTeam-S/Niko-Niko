import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MembreService } from './membre.service';

@ApiBearerAuth()
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
