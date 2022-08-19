import { ApiProperty } from "@nestjs/swagger";

export class HumeurCreateDto {
    @ApiProperty()
    humeur_type!: string;

    @ApiProperty()
    groupe_id!: number;
}

export class HumeurDto {
    lundi: string;
    mardi: any;
    mercredi: string;
    jeudi: any;
    vendredi: any;
    semaine: Date;
    prenom_usuel: string;
}

export class HumeurResponse {
    semaine_id: Date;
    humeurs: HumeurDto[];
}
