import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membre } from 'src/output';
import { Repository } from 'typeorm';

@Injectable()
export class MembreService {
    constructor(
        @InjectRepository(Membre)
        private membreRepository: Repository<Membre>
    ) {}

    async findAll(): Promise<Membre[]> {
        return await this.membreRepository
        .createQueryBuilder("m")
        .select([
            "m.id as id", "m.prenom_usuel as prenom_usuel"
        ])
        .getRawMany();
    }
}
