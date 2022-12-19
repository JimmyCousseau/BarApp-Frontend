import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/Interfaces/User";
import { GlobalSettings } from "./GlobalSettings";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) { }

    findAll() {
        return this.http.get(GlobalSettings.getURL() + 'user');
    }

    updatePassword(userToModify: User, password: string) {
        return this.http.patch(GlobalSettings.getURL() + 'user/update-password/' + password, { userToModify });
    }

    updateRole(userToModify: User, adminUser: User) {
        return this.http.patch(GlobalSettings.getURL() + 'user/update-role', { userToModify, adminUser });
    }

    create(userToCreate: User, adminUser: User) {
        return this.http.post(GlobalSettings.getURL() + 'user', { userToCreate, adminUser });
    }

    delete(userToDelete: User, adminUser: User) {
        return this.http.post(GlobalSettings.getURL() + 'user/delete', { userToDelete, adminUser });
    }

}
