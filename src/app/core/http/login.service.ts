import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Interfaces/User";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    private readonly baseUrl = environment.baseUrl + 'login'

    constructor(private http: HttpClient) { }

    login(user: User): Observable<any> {
        console.log(user)
        const res = this.http.post<any>(this.baseUrl, {
          username: user.username,
          password: user.password,
        });
        res.forEach((next) => console.log(next))
        return res
    }

    verifyToken(token: string | null | undefined, username: string | null | undefined): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/verifyToken', { username, token });
    }

    verifyIdentification(user: User): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + '/verifyIdentification', { user })
    }

    disconnect(username: string): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/disconnect/' + username)
    }
}
