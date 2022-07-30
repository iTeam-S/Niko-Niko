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

@Index("fk_humeur_groupe_id", ["groupeId"], {})
@Index("fk_humeur_membre_id", ["membreId"], {})
@Entity("humeur", { schema: "NIKO" })
export class Humeur {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "humeur_type", nullable: true, length: 255 })
  humeurType: string | null;

  @Column("datetime", {
    name: "posted_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  postedAt: Date | null;

  @Column("int", { name: "groupe_id" })
  groupeId: number;

  @Column("int", { name: "membre_id" })
  membreId: number;

  @ManyToOne(() => Groupe, (groupe) => groupe.humeurs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "groupe_id", referencedColumnName: "id" }])
  groupe: Groupe;

  @ManyToOne(() => Membre, (membre) => membre.humeurs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "membre_id", referencedColumnName: "id" }])
  membre: Membre;
}
