import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/Interfaces/User";

@Injectable({
    providedIn: 'root',
})
export class ParameterService {

    private url: string = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    changePassword(userToModify: User, password: string) {
        return this.http.post(this.url + 'parameters/change-password', { userToModify, password });
    }

    changeUsersRole(userToModify: User, adminUser: User, role: string) {
        return this.http.post(this.url + 'parameters/change-role/' + role, { userToModify, adminUser });
    }

    addUser(user: User, adminUser: User) {
        return this.http.post(this.url + 'parameters/add-user', { user, adminUser });
    }

    deleteUser(userToDelete: User, adminUser: User) {
        return this.http.post(this.url + 'parameters/delete-user', { userToDelete, adminUser });
    }

    getRoleList() {
        return this.http.get(this.url + 'parameters/role-list');
    }

    getUsersList() {
        return this.http.get(this.url + 'parameters/users-list');
    }
}
