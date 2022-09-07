import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelAllMembre, ModelCreateHumeur, ModelCreateMembre, ModelGroupCreated, ModelGroupLists, 
    ModelMembreGroup, ModelMyGroupe, ModelNomGroupe, ModelSingleGroupe } from "../models/niko.model";

@Injectable({
    providedIn: 'root'
})
export class NikoService {
    constructor(
        private http: HttpClient
    ) {}

    // ========================== GROUPES ============================
    createGroup(donnees: { nom: string }): Observable<any> {
        return this.http.post(environment.baseUrl + "/groupe/create", 
            donnees, { observe: 'response' });
    }

    getListsOfGroups(): Observable<ModelGroupLists[]> {
        return this.http.get<ModelGroupLists[]>(environment.baseUrl + '/groupe');
    }

    updateGroupe(donnees: { id: number, nom: string }): Observable<any> {
        return this.http.patch(environment.baseUrl + '/groupe/update', donnees, 
            { observe: 'response' });
    }

    removeGroupe(id: number | undefined ): Observable<any> {
        return this.http.delete(environment.baseUrl + `/groupe/delete/${ id }`, 
            { observe: 'response' });
    }

    getNomGroupe(groupe_id: number): Observable<ModelNomGroupe> {
        return this.http.get<ModelNomGroupe>(environment.baseUrl + `/groupe/${ groupe_id }`);
    }

    // ========================= MEMBRES OF GROUPES =============================
    createMembreGroupe(donnees: ModelCreateMembre): Observable<any> {
        return this.http.post(environment.baseUrl + '/appartenance/create', donnees, 
            { observe: 'response' });
    }

    getMembreGroupe(id: number | undefined): Observable<ModelMembreGroup[]> {
        return this.http.get<ModelMembreGroup[]>(environment.baseUrl + 
            `/appartenance/groupe/${ id }`);
    }

    removeMembreGroupe(id: number): Observable<any> {
        return this.http.delete(environment.baseUrl + `/appartenance/delete/${ id }`,
            { observe: 'response' });
    }

    // ========================== ALL MEMBRES =====================================
    getAllMembre(): Observable<ModelAllMembre[]> {
        return this.http.get<ModelAllMembre[]>(environment.baseUrl + '/membre');
    }

    // ========================== MES GROUPES =====================================
    getMyListGroup(): Observable<ModelMyGroupe[]> {
        return this.http.get<ModelMyGroupe[]>(environment.baseUrl + 
            '/appartenance/membre-groupe');
    }

    // ========================== SINGLE GROUPE ===================================
    getSingleGroupe(groupe_id: number): Observable<ModelSingleGroupe[]> {
        return this.http.get<ModelSingleGroupe[]>(environment.baseUrl + 
            `/humeur/membre/${ groupe_id }`);
    }

    createMood(donnees: ModelCreateHumeur): Observable<any> {
        return this.http.post(environment.baseUrl + `/humeur/create`, 
            donnees, { observe: 'response' });
    }

    getMoodGroupes(groupe_id: number): Observable<ModelGroupCreated[]> {
        return this.http.get<ModelGroupCreated[]>(environment.baseUrl + 
            `/humeur/groupe/${groupe_id}`);
    }
}
