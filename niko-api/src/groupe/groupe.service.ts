import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Groupe, Membre } from 'src/output';
import { Repository } from 'typeorm';
import { GroupeCreateDto, GroupeUpdateDto } from './dto';

@Injectable()
export class GroupeService {
    constructor(
        @InjectRepository(Groupe)
        private groupeRepository: Repository<Groupe>
    ) {}

    async create(membre_id: number, donnees: GroupeCreateDto): Promise<void> {
        await this.groupeRepository
        .createQueryBuilder()
        .insert()
        .into(Groupe)
        .values({
            nom: donnees.nom,
            membreId: membre_id
        })
        .execute();
    }

    async find(membre_id: number): Promise<Groupe[]> {
        return await this.groupeRepository
        .createQueryBuilder("g")
        .select([
            "g.id as id", "g.nom as nom_groupe",
            "g.created_at as created_at",
            "m.prenom_usuel as prenom_usuel"
        ])
        .innerJoin(Membre, "m", "m.id=g.membre_id")
        .where(`g.membre_id=:identifiant`, { identifiant: membre_id})
        .getRawMany();
    }

    async findAll(): Promise<Groupe[]> {
        return await this.groupeRepository
        .createQueryBuilder("g")
        .select([
            "g.id as id", "g.nom as nom_groupe",
            "g.created_at as created_at",
            "m.prenom_usuel as prenom_usuel",
            "m.mail as mail"
        ])
        .innerJoin(Membre, "m", "m.id=g.membre_id")
        .getRawMany();
    }

    async update(donnees: GroupeUpdateDto): Promise<void> {
        await this.groupeRepository
        .createQueryBuilder()
        .update(Groupe)
        .set({
            nom: donnees.nom
        })
        .where(`id=:identifiant`, { identifiant: donnees.id })
        .execute();
    }
}
