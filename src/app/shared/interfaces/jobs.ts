export interface JobsResponse {
    estatus: boolean;
    mensaje: string;
    datos: Job;
}

export interface Job {
    puestoID?: number
    nombre: string;
    descripcion: string;
    departamentoID: number;
    tieneAccesoGlobal?: boolean;
    permisos: Permiso[];
}

export interface Permiso {
    permisoID: number;
}

export interface DepartmentResponse {
    estatus: boolean;
    mensaje: string;
    paginador?: Paginador;
    datos: Job[];
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