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

export interface InfoUserResponse {
    estatus: boolean;
    mensaje: string;
    datos: DataUser;
}

export interface DataUser {
    id: number;
    nombre: string;
    paterno: string;
    materno: string;
    correo: string;
    fechaNacimiento: string;
    estatus: number;
    esSuperUsuario: boolean;
    perfil: boolean; //null
    permisos: string[];
}