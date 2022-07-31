import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPostedDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('niko')
    async authUser(@Body() donnees: AuthPostedDto) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.authService.authentifier(donnees);
    }
}
