export interface ClientResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: Client[];
    catalogos: any;
}

export interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}

export interface Client {
    nombre: string;
    telefono: string;
    correo: string;
    clienteID: number;
    observaciones: string;
    direccion: Direccion;
    contactosAdicionales: any[];
    informacionFiscal: informacionFiscal;
    color?: string; 
}

export interface Direccion {
    calle: string;
    numeroExterior: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
    numeroInterior: string;
}

export interface informacionFiscal {
    rfc: string;
    razonSocial: string;
    informacionID: number;
    tipoPersona: number;
    direccion: Direccion;
}