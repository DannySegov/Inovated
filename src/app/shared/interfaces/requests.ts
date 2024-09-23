export interface RequestResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: Request[];
    catalogos: any | null;
}

interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}

interface Request {
    descripcion: string;
    servicioID: number;
    infoServicio: InfoServicio;
    fecha: string;
    hora: string;
    perfil: Perfil;
    empleadoID: number | null;
    esAsignado: boolean;
}

interface InfoServicio {
    claveServicio: string;
    categoria: string;
    nombreServicio: string;
    descripcion: string;
    servicioOfreceID: number;
}

interface Perfil {
    nombre: string;
    telefono: string;
    correo: string;
    clienteID: number;
    direccion: Direccion;
}

interface Direccion {
    calle: string;
    numeroExterior: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
    numeroInterior?: string;
}
