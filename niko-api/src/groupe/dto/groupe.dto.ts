import { ApiProperty } from "@nestjs/swagger";

export class GroupeCreateDto {
    @ApiProperty()
    nom!: string;
}

export class GroupeUpdateDto {
    @ApiProperty()
    id!: number;
    nom!: string;
}
