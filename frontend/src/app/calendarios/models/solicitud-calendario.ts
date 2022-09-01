import { Recurso } from "src/app/recursos/models/recurso";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";

export interface SolicitudCalendario {
    id: string;
    estado: string;
    fechaSolicitud: string;
    fechaHoraInicioRecurso: string;
    fechaHoraFinRecurso: string;
    unidadUsuaria: string;
    etiqueta: string;
    observacionesCenad: string;
    idUnidad: string;
    recurso: Recurso | any;
    url: string;
}
