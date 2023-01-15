import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserProxy } from "src/app/Interfaces/User";
import { GlobalSettings } from "./globale-settings.service";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) { }

    findAll() {
        return this.http.get(GlobalSettings.getURL() + 'user');
    }

    updatePassword(userToModify: UserProxy, password: string) {
        return this.http.patch(GlobalSettings.getURL() + 'user/update-password/' + password, { userToModify });
    }

    updateRole(userToModify: UserProxy, adminUser: UserProxy) {
        return this.http.patch(GlobalSettings.getURL() + 'user/update-role', { userToModify, adminUser });
    }

    create(userToCreate: UserProxy, adminUser: UserProxy) {
        return this.http.post(GlobalSettings.getURL() + 'user', { userToCreate, adminUser });
    }

    delete(userToDelete: UserProxy, adminUser: UserProxy) {
        return this.http.post(GlobalSettings.getURL() + 'user/delete', { userToDelete, adminUser });
    }

}
