import { ApiProperty } from "@nestjs/swagger";

export class HumeurCreateDto {
    @ApiProperty()
    humeur_type!: string;

    @ApiProperty()
    groupe_id!: number;
}
