import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appartenance } from 'src/output';
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
}
