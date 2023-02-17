import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserProxy } from "../Interfaces/User";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private readonly baseUrl = environment.baseUrl + "user"

    constructor(private http: HttpClient) { }

    findAll(): Observable<UserProxy[]> {
        return this.http.get<UserProxy[]>(this.baseUrl);
    }

    updatePassword(user: UserProxy, password: string): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + '/update-password/' + password, { user: user, passwd: password })
    }

    updateRole(user: UserProxy): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + '/update-role', { user: user });
    }

    insert(user: UserProxy): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl, { user: user });
    }

    delete(username: string): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/' + username);
    }

}
