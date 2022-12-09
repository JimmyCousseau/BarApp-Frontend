
export class GlobalSettings {
    private static readonly URL: string = 'http://localhost:3000/';

    static getURL(): string {
        return this.URL;
    }
}
