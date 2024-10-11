export interface QuoteResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: Quote;
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

export interface Quote {
    descripcion: string;
    servicioID: number;
    infoServicio: InfoServicio;
    fecha: string;
    hora: string;
    perfil: Perfil;
    esAsignado: boolean;
    levantamiento: Levantamiento;
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
    numeroInterior?: string; // Es opcional
}

export interface Levantamiento {
    observaciones: string;
    resumenLevantamiento: string;
    levantamientoID: number;
    fechaInstalacion: string;
    horaInstalacion: string;
    imagenes: Image[]; // Array para almacenar las imágenes
}


export interface AddQuote {
    folioCotizacion: string;
    costoCotizado: number;
    imagenes: Image[];
}

export interface Image {
    imagenID: number | null;
    imagen: string; // Base64 string
}
