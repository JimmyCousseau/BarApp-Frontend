import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GlobalSettings {
    private static readonly URL: string = 'http://localhost:3000/';

    static getURL(): Readonly<string> {
        return this.URL;
    }
}
