export class ResponseToSign {
    id: number;
    prenom_usuel: string;
    mail: string;
}

export class ResponseToken {
    access_token: string;
}

export class AuthPostedDto {
    identifiant!: string;
    password!: string;
}
