import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Groupe, Humeur, Membre } from 'src/output';
import { Repository } from 'typeorm';
import { HumeurCreateDto, HumeurDto, HumeurResponse } from './dto';

@Injectable()
export class HumeurService {
    constructor(
        @InjectRepository(Humeur)
        private humeurRepository: Repository<Humeur>,
        @InjectRepository(Groupe)
        private groupeRepository: Repository<Groupe>
    ) {}

    private async verifyHumeur(membre_id: number, donnees: HumeurCreateDto): Promise<Humeur> {
        return await this.humeurRepository
        .createQueryBuilder("h")
        .select(["h.id"])
        .where(` DATE(h.posted_at)=CURDATE()
            AND h.groupe_id=:groupe
            AND h.membre_id=:membre`, {
                groupe: donnees.groupe_id,
                membre: membre_id
            })
        .getRawOne();
    }

    async create(membre_id: number, donnees: HumeurCreateDto): Promise<void> {
        const verify = await this.verifyHumeur(membre_id, donnees);
        if(verify) throw new ForbiddenException("Vous ne pouvez plus poster d'humeur aujourd'hui...!");
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

    async findBymembre(membre_id: number, donnees: { id: number }): Promise<Humeur[]> {
        return this.humeurRepository
        .createQueryBuilder('h')
        .select([
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 0
            ) as lundi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 1
            ) as mardi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 2
            ) as mercredi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 3
            ) as jeudi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 4
            ) as vendredi`,
            `(
                SELECT DATE_SUB(DATE(posted_at), INTERVAL  (WEEKDAY(posted_at) - 1) DAY)
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                GROUP BY WEEK(posted_at)
            ) as semaine`,
            'm.prenom_usuel'
        ])
        .innerJoin(Membre, "m", "m.id = h.membre_id")
        .where(`h.membre_id=:identifiant 
            AND h.groupe_id=:groupe`, { 
                identifiant: membre_id,
                groupe: donnees.id
            })
        .groupBy("WEEK(posted_at)")
        .orderBy("WEEK(posted_at)", "DESC")
        .getRawMany();
    }

    private async verifyGroupeOwner(membre_id: number, 
        donnees: { id: number }): Promise<Groupe> {
        return await this.groupeRepository
            .createQueryBuilder("g")
            .select(["g.id"])
            .where("g.id=:groupe_id AND g.membre_id=:identifiant", {
                groupe_id: donnees.id,
                identifiant: membre_id
            })
            .getRawOne();
    }

    async findByGroupe(membre_id: number, donnees: {id: number }): Promise<HumeurResponse[]> {
        const verify = await this.verifyGroupeOwner(membre_id, donnees);
        if(!verify) throw new ForbiddenException("Erreur de groupe...!");
        const reponses: HumeurDto[] = await this.humeurRepository
        .createQueryBuilder('h')
        .select([
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 0
            ) as lundi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 1
            ) as mardi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 2
            ) as mercredi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 3
            ) as jeudi`,
            `(
                SELECT humeur_type  
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                AND WEEKDAY(posted_at) = 4
            ) as vendredi`,
            `(
                SELECT DATE_SUB(DATE(posted_at), INTERVAL (WEEKDAY(posted_at) - 1) DAY)
                FROM humeur
                WHERE membre_id = h.membre_id
                AND groupe_id = h.groupe_id
                AND WEEK(posted_at) = WEEK(h.posted_at)
                GROUP BY WEEK(posted_at)
            ) as semaine`,
            'm.prenom_usuel'
        ])
        .innerJoin(Membre, "m", "m.id = h.membre_id")
        .where(`h.groupe_id=:groupe`, {
                groupe: donnees.id
            })
        .groupBy("WEEK(posted_at)")
        .addGroupBy("h.membre_id")
        .orderBy("WEEK(posted_at)", "DESC")
        .getRawMany();
        
        const semaines: string[] = [];
        reponses.map(value => {
            if(!semaines.includes(value.semaine.toString())) 
                semaines.push(value.semaine.toString());
        });
        return semaines.map(value => {
            return {
                semaine_id: new Date(value),
                humeurs: reponses.filter((element: HumeurDto) =>
                    element.semaine.toString() === value)
            };
        });
    }
}
