import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Humeur } from 'src/output';
import { Repository } from 'typeorm';
import { HumeurCreateDto } from './dto';

@Injectable()
export class HumeurService {
    constructor(
        @InjectRepository(Humeur)
        private humeurRepository: Repository<Humeur>
    ) {}

    private async verifyHumeur(membre_id: number, donnees: HumeurCreateDto): Promise<Humeur> {
        return await this.humeurRepository
        .createQueryBuilder("h")
        .select(["h.id"])
        .where(` h.created_at=:today
            AND h.groupe_id=:groupe
            AND h.membre_id=:membre`, {
                today: () => "CURDATE()",
                groupe: donnees.groupe_id,
                membre: membre_id
            })
        .getRawOne();
    }

    async create(membre_id: number, donnees: HumeurCreateDto): Promise<void> {
        const verify = await this.verifyHumeur(membre_id, donnees);
        if(verify) throw new ForbiddenException("Can't anymore react to day !");
        await this.humeurRepository
        .createQueryBuilder()
        .insert()
        .into(Humeur)
        .values({
            humeurType: donnees.humeur_type,
            groupeId: donnees.groupe_id,
            membreId: membre_id
        })
        .execute();
    }
}
