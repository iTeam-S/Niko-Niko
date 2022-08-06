import { ApiProperty } from "@nestjs/swagger";

export class AppartenanceCreateDto {
    @ApiProperty()
    groupe_id!: number;

    @ApiProperty()
    membre_list!: number[];
}

export class AppartenanceValues {
    groupeId!: number;
    membreId!: number;
}
