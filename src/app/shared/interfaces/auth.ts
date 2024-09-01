//Obtener Token
export interface User {
    correo: string;
    password: string;
}

export interface AuthResponse {
    correo: string;
    refresh: string;
    access: string;
}

export enum AuthStatus {
    checking = 'checking',
    authenticated = 'authenticated',
    notAuthenticated = 'notAuthenticated'
}

//Actualizar Token
export interface RefreshToken {
    refresh: string;
}

export interface RefreshResponse {
    refresh: string;
    access: string;
}