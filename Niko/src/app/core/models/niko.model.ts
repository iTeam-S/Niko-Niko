export class ModelGroupLists {
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

export class ModelMyGroupe {
    id!: number;
    nom_groupe!: string;
    created_at!: Date;
    groupe_id!: number;
}

export class ModelSingleGroupe {
    lundi!: string;
    mardi!: string;
    mercredi!: string;
    jeudi!: string;
    vendredi!: string;
    semaine!: Date;
    prenom_usuel!: string;
}

export class ModelCreateHumeur {
    humeur_type!: string;
    groupe_id!: number;
}

export class ModelGroupCreated {
    semaine_id!: Date;
    humeurs!: ModelSingleGroupe[];
}

export class ModelNomGroupe {
    nom_groupe!: string;
}
