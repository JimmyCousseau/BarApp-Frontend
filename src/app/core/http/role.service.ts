import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Role } from "../Interfaces/Role";

@Injectable({
    providedIn: 'root',
})
export class RoleService {

    private readonly baseUrl = environment.baseUrl

    constructor(private http: HttpClient) { }

    findAll(): Observable<Role[]> {
        return this.http.get<Role[]>(this.baseUrl + 'role');
    }

    create(roleName: string): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'role/create', { roleName });
    }

    delete(role: string): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'role/remove', { role });
    }

    update(role: Role): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + "role", { role: role })
    }

}
