import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthModel } from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    setToken(token: string): void {
        localStorage.setItem('niko_iTeam-$', token);
    }

    getToken(): string | null {
        return localStorage.getItem('niko_iTeam-$');
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    logIn(donnees: AuthModel): Observable<any> {
        return this.http.post(environment.baseUrl + "/auth/niko", 
            donnees, { observe: "response" });
    }

    logOut(): void {
        localStorage.removeItem('niko_iTeam-$');
        this.router.navigateByUrl('/');
    }
}
