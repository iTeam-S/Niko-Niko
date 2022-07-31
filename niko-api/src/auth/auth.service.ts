import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthPostedDto, ResponseToken, ResponseToSign } from './dto';
import { Membre } from 'src/output';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Membre)
        private authRepository: Repository<Membre>,
        private jwtService: JwtService
    ) {}

    private async signAuth(donnees: ResponseToSign): Promise<string> {
        return this.jwtService.signAsync({
            id: donnees.id,
            prenom_usuel: donnees.prenom_usuel,
            mail: donnees.mail
        });
    }

    async authentifier(donnees: AuthPostedDto): Promise<ResponseToken> {
        const responseData = await this.authRepository
            .createQueryBuilder("m")
            .select([
                "m.id as id", 
                "m.prenom_usuel as prenom_usuel",
                "m.mail as mail" 
            ])
            .where(`(m.prenom_usuel=:identifiant OR m.mail=:identifiant)
                AND m.password=SHA2(:password, 256)`, {
                identifiant: donnees.identifiant,
                password: donnees.password
            })
            .getRawOne();
        if(!responseData) throw new UnauthorizedException("Credentials incorrects !");
        return {
            access_token: await this.signAuth(responseData)
        }
    }
}
