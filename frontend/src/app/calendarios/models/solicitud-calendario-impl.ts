import { Recurso } from "src/app/recursos/models/recurso";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";
import { SolicitudCalendario } from "./solicitud-calendario";

export class SolicitudCalendarioImpl implements SolicitudCalendario {
     
    id: string;
    estado: string;
    fechaSolicitud: string;
    fechaHoraInicioRecurso: string;
    fechaHoraFinRecurso: string;
    unidadUsuaria: string;
    etiqueta: string;
    observacionesCenad: string;
    idUnidad: string;
    recurso: any;
    url: string;

    constructor() {}
}
