import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../../Interfaces/Role";
import { UserProxy } from "../../Interfaces/User";
import { GlobalSettings } from "./globale-settings.service";

@Injectable({
    providedIn: 'root',
})
export class RoleService {

    constructor(private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'role');
    }

    findOneBy(role: string): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + "role/" + role)
    }

    create(roleName: string, adminUser: UserProxy): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'role/create', { roleName, adminUser });
    }

    delete(role: string, adminUser: UserProxy): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'role/remove', { role, adminUser });
    }

    update(role: Role, adminUser: UserProxy): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "role", { role: role, adminUser: adminUser })
    }

}
