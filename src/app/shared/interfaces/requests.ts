export interface RequestResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: Request[];
    catalogos: any | null;
}

export interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}

export interface Request {
    descripcion: string;
    servicioID: number;
    infoServicio: InfoServicio;
    fecha: string;
    hora: string;
    perfil: Perfil;
    empleadoID: number | null;
    esAsignado: boolean;
}

export interface InfoServicio {
    claveServicio: string;
    categoria: string;
    nombreServicio: string;
    descripcion: string;
    servicioOfreceID: number;
}

export interface Perfil {
    nombre: string;
    telefono: string;
    correo: string;
    clienteID: number;
    direccion: Direccion;
}

export interface Direccion {
    calle: string;
    numeroExterior: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
    numeroInterior?: string;
}

export interface Employee {
    id: number;
    correo: string;
    nombreCompleto: string;
    empleadoID: number;
    puestoID: number;
    nombrePuesto: string;
}
