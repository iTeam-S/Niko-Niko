import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appartenance, Groupe, Humeur, Membre } from 'src/output';
import { GroupeController } from './groupe.controller';
import { GroupeService } from './groupe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Groupe, Membre, 
    Appartenance, Humeur])],
  exports: [TypeOrmModule],
  controllers: [GroupeController],
  providers: [GroupeService]
})
export class GroupeModule {}
