import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    private url: string = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    login(username: string | null | undefined, password: string | null | undefined): Observable<any> {
        return this.http.post(this.url + 'login', { username, password });
    }
}
