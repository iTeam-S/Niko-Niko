import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Groupe } from 'src/output';
import { Repository } from 'typeorm';
import { GroupeCreateDto } from './dto';

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
}
