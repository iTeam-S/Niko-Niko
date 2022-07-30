import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Groupe } from "./Groupe";
import { Membre } from "./Membre";

@Index("fk_appartence_groupe_id", ["groupeId"], {})
@Index("fk_appartence_membre_id", ["membreId"], {})
@Entity("appartence", { schema: "NIKO" })
export class Appartence {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "groupe_id" })
  groupeId: number;

  @Column("int", { name: "membre_id" })
  membreId: number;

  @ManyToOne(() => Groupe, (groupe) => groupe.appartences, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "groupe_id", referencedColumnName: "id" }])
  groupe: Groupe;

  @ManyToOne(() => Membre, (membre) => membre.appartences, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "membre_id", referencedColumnName: "id" }])
  membre: Membre;
}
