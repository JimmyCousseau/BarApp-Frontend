import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/Interfaces/User";
import { GlobalSettings } from "./GlobalSettings";

@Injectable({
    providedIn: 'root',
})
export class ParameterService {

    constructor(private http: HttpClient) { }

    changePassword(userToModify: User, password: string) {
        return this.http.post(GlobalSettings.getURL() + 'parameters/change-password', { userToModify, password });
    }

    changeUsersRole(userToModify: User, adminUser: User, role: string) {
        return this.http.post(GlobalSettings.getURL() + 'parameters/change-role/' + role, { userToModify, adminUser });
    }

    addUser(userToAdd: User, adminUser: User) {
        return this.http.post(GlobalSettings.getURL() + 'parameters/add-user', { userToAdd, adminUser });
    }

    deleteUser(userToDelete: User, adminUser: User) {
        return this.http.post(GlobalSettings.getURL() + 'parameters/delete-user', { userToDelete, adminUser });
    }

    getRoleList() {
        return this.http.get(GlobalSettings.getURL() + 'parameters/role-list');
    }

    getUsersList() {
        return this.http.get(GlobalSettings.getURL() + 'parameters/users-list');
    }
}
