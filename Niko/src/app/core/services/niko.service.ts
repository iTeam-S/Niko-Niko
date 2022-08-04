import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelGroupLists } from "../models/niko.model";

@Injectable({
    providedIn: 'root'
})
export class NikoService {
    constructor(
        private http: HttpClient
    ) {}

    getListsOfGroups(): Observable<ModelGroupLists[]> {
        return this.http.get<ModelGroupLists[]>(environment.baseUrl + '/groupe');
    }

    createGroup(donnees: { nom: string }): Observable<any> {
        return this.http.post(environment.baseUrl + "/groupe/create", 
            donnees, { observe: 'response' });
    }

    removeGroupe(id: number | null ): Observable<any> {
        return this.http.delete(environment.baseUrl + `/groupe/delete/${ id }`, 
            { observe: 'response' });
    }
}
