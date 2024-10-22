export interface PaymentResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: Cotizacion;
    catalogos: any; // Si `catalogos` tiene estructura específica, reemplaza `any` con la estructura correcta
}

export interface Cotizacion {
    cotizacionID: number;
    folioCotizacion: string;
    costoCotizado: string;
    estatusCotizacion: number;
    levantamientoID: number;
    infoServicio: InfoServicio;
    fechaInstalacion: string;
    horaInstalacion: string;
    perfil: Perfil;
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
    numeroInterior: string;
}

export interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}



