export interface UserProxy {
    username: string;
    role: string;
}

export interface User extends UserProxy {
    password: string;
}
