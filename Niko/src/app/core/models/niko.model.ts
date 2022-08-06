export class ModelGroupLists {
    [x: string]: any;
    id!: number;
    nom_groupe!: string;
    created_at!: Date;
    prenom_usuel!: string;
}

export class ModelMembreGroup {
    id!: number;
    nom_groupe!: string;
    created_at!: Date;
    prenom_usuel!: string;
}


export class ModelAllMembre {
    id!: number;
    prenom_usuel!: string;
}

export class ModelCreateMembre {
    groupe_id!: number;
    membre_list!: number[];
}
