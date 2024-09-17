//getClients
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
    informacionFiscal: InformacionFiscal;
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

export interface InformacionFiscal {
    rfc: string;
    razonSocial: string;
    informacionID: number;
    tipoPersona: number;
    direccion: Direccion;
}

//addClient
export interface DataClient {
    nombre: string;
    telefono: string;
    correo: string;
    observaciones: string;
    direccion: Direccion;
    contactosAdicionales: string[];
    informacionFiscal: InfoFiscalAddClient;
}

export interface InfoFiscalAddClient {
    rfc: string;
    razonSocial: string;
    tipoPersona: number;
    direccion: Direccion;
}

export interface ClientResponseAdd {
    estatus: boolean;
    mensaje: string;
    datos: string;
}