import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../../app/Interfaces/User";
import { PermissionsRole } from "../../../app/Interfaces/PermissionsRole";
import { GlobalSettings } from "./GlobalSettings";

@Injectable({
    providedIn: 'root',
})
export class PermissionService {

    constructor(
        private http: HttpClient
    ) {

    }

    findOneBy(role: string): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + "permission/" + role)
    }

    findAll(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + "permission")
    }

    update(permissions: PermissionsRole, adminUser: User): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "permission", { permissions, adminUser })
    }

}
