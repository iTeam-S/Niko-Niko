import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appartence } from "./Appartence";
import { Membre } from "./Membre";
import { Humeur } from "./Humeur";

@Index("fk_groupe_membre_id", ["membreId"], {})
@Entity("groupe", { schema: "NIKO" })
export class Groupe {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 255 })
  nom: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("int", { name: "membre_id" })
  membreId: number;

  @OneToMany(() => Appartence, (appartence) => appartence.groupe)
  appartences: Appartence[];

  @ManyToOne(() => Membre, (membre) => membre.groupes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "membre_id", referencedColumnName: "id" }])
  membre: Membre;

  @OneToMany(() => Humeur, (humeur) => humeur.groupe)
  humeurs: Humeur[];
}
