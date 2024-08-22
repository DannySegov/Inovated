export interface User {
    correo: string;
    password: string;
}

export interface AuthResponse {
    correo: string;
    refresh: string;
    access: string;
}

export interface loginResponse {
    user: User;
    token: string;
}

export enum AuthStatus {
    checking = 'checking',
    authenticated = 'authenticated',
    notAuthenticated = 'notAuthenticated'
}