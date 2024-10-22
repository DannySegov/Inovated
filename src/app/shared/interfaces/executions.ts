export interface ExecutionResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: Servicio[];
}


export interface Servicio {
    descripcion: string;
    servicioID: number;
    infoServicio: InfoServicio;
    fecha: string;
    hora: string;
    perfil: Perfil;
    esAsignado: boolean;
    levantamientoID: number;
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
    numeroInterior?: string; // Campo opcional
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
}

export interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}

//Ejecución por ID
export interface ExecutionById {
    estatus: boolean;
    mensaje: string;
    datos: Execution;
}

export interface Execution {
    descripcion: string;
    servicioID: number;
    infoServicio: InfoServicio;
    fecha: string;
    hora: string;
    perfil: Perfil;
    esAsignado: boolean;
    levantamiento: Levantamiento;
}

export interface Levantamiento {
    observaciones: string;
    resumenLevantamiento: string;
    levantamientoID: number;
    fechaInstalacion: string;
    horaInstalacion: string;
    imagenes: string[];
}

// Agregar Ejecución
export interface AddExecution {
    instalacionCorrecta: boolean;
    observaciones: string;
}


