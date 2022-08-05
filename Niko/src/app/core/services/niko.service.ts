import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelAllMembre, ModelCreateMembre, ModelGroupLists, ModelMembreGroup } from "../models/niko.model";

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
}
