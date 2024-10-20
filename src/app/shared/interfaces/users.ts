export interface UserResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: User;
    catalogos: any | null; // Definir la estructura de 'catalogos' según tus necesidades si no es null
}

export interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}

export interface Perfil {
    puestoID: number;
    cambioContrasena?: boolean;
}

export interface Direccion {
    calle: string;
    numeroExterior: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
    direccionID: number;
    numeroInterior: string;
}

export interface User {
    id: number;
    nombre: string;
    paterno: string;
    correo: string;
    fechaNacimiento: string;
    password?: string;
    estatus: number;
    materno: string;
    telefono?: string;
    ultimoLogin: string | null;
    perfil?: Perfil;
    direccion: Direccion;
    contactos: Contactos; // Puedes definir la estructura de 'contactos' según tus necesidades
}

export interface DataUser {
    nombre: string;
    paterno: string;
    correo: string;
    fechaNacimiento?: string;
    password?: string;
    materno: string;
    perfil: Perfil;
    direccion: Direccion;
    contactos: any[]; 
  }

  export interface Contactos {
    contactoID: number;
    nombre: string;
    telefono: string;
    correo: string;
  }



