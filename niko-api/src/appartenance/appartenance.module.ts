import { Module } from '@nestjs/common';
import { AppartenanceService } from './appartenance.service';
import { AppartenanceController } from './appartenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appartenance, Groupe, Membre } from 'src/output';

@Module({
  imports: [TypeOrmModule.forFeature([Appartenance, Groupe, Membre])],
  exports: [TypeOrmModule],
  providers: [AppartenanceService],
  controllers: [AppartenanceController]
})
export class AppartenanceModule {}
