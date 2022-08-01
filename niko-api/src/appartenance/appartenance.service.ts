import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appartenance, Groupe, Membre } from 'src/output';
import { Repository } from 'typeorm';
import { AppartenanceCreateDto, AppartenanceValues } from './dto';

@Injectable()
export class AppartenanceService {
    constructor(
        @InjectRepository(Appartenance)
        private appartenanceRepository: Repository<Appartenance>
    ) {}

    async create(donnees: AppartenanceCreateDto): Promise<void> {
        const membreGroupe: AppartenanceValues[] = donnees.membre_list.map((membre: number) => ({
            groupeId: donnees.groupe_id,
            membreId: membre
        }));
        await this.appartenanceRepository
        .createQueryBuilder()
        .insert()
        .into(Appartenance)
        .values(membreGroupe)
        .execute();
    }

    async findByGroupe(groupe_id: number): Promise<Appartenance[]> {
        return await this.appartenanceRepository
        .createQueryBuilder("a")
        .select([
            "a.id as id", "g.nom as nom_groupe",
            "g.created_at as created_at",
            "m.prenom_usuel as prenom_usuel"
        ])
        .innerJoin(Groupe, "g", "g.id=a.groupe_id")
        .innerJoin(Membre, "m", "m.id=a.membre_id")
        .where(`a.groupe_id=:identifiant`, { identifiant: groupe_id })
        .getRawMany();
    }

    async remove(donnees: { id: number }): Promise<void> {
        await this.appartenanceRepository.delete(donnees.id);
    }
}
