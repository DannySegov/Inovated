export interface DepartmentResponse {
    estatus: boolean;
    mensaje: string;
    paginador?: Paginador;
    datos: DataDepartment;
    catalogos?: null;
}

export interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}

export interface DataDepartment {
    nombre: string;
    descripcion: string;
    departamentoID?: number;
    permisos: string[];
}