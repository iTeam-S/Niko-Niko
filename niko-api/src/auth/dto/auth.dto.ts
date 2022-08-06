import { ApiProperty } from "@nestjs/swagger";

export class ResponseToSign {
    id: number;
    prenom_usuel: string;
    mail: string;
}

export class ResponseToken {
    access_token: string;
}

export class AuthPostedDto {
    @ApiProperty()
    identifiant!: string;

    @ApiProperty()
    password!: string;
}
