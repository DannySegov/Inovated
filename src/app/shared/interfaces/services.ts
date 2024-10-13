export interface ServiceResponse {
    estatus: boolean;
    mensaje: string;
    paginador: Paginador;
    datos: ServicioRequerimentsResponse[];
    catalogos: any | null;
}

export interface Service {
    estatus: boolean;
    mensaje: string;
    datos: {
      nombreServicio: string;
      claveServicio: string;
      categoria: string;
      descripcion: string;
      servicioOfreceID: number;
    };
  }

  
export interface ServicioRequerimentsResponse {
    nombreServicio: string;
    claveServicio: string;
    categoria: string;
    descripcion: string;
    servicioOfreceID: number;
}

export interface ServiceRequeriments {
    descripcion: string;
    fecha: Date;
    hora: string;
    servicioOfreceID: number;
}

export interface Paginador {
    limite: number;
    offset: number;
    pagina: number;
    total: number;
    registros: number;
    siguiente: number;
}


