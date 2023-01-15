import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "./globale-settings.service";

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(private http: HttpClient) { }

    login(username: string | null | undefined, password: string | null | undefined): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'login', { username, password });
    }

    verifyToken(token: string | null | undefined, username: string | null | undefined): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'login/verifyToken', { username, token });
    }
}
