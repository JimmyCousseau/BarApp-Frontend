import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/Interfaces/User";
import { GlobalSettings } from "./GlobalSettings";

@Injectable({
    providedIn: 'root',
})
export class RoleService {

    constructor(private http: HttpClient) { }

    findAll() {
        return this.http.get(GlobalSettings.getURL() + 'role');
    }

    create(roleName: string, adminUser: User) {
        return this.http.post(GlobalSettings.getURL() + 'role/create', { roleName, adminUser });
    }

    delete(roleName: string, adminUser: User) {
        return this.http.post(GlobalSettings.getURL() + 'role/delete', { roleName, adminUser });
    }

}
