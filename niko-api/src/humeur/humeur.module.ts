import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groupe, Humeur, Membre } from 'src/output';
import { HumeurController } from './humeur.controller';
import { HumeurService } from './humeur.service';

@Module({
  imports: [TypeOrmModule.forFeature([Humeur, Membre, Groupe])],
  exports: [TypeOrmModule],
  controllers: [HumeurController],
  providers: [HumeurService]
})
export class HumeurModule {}
