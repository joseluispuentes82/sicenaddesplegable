import { SolicitudArma } from "src/app/solicitudes-recursos/models/solicitud-arma";

export interface Arma {
  idArma: string;
  nombre: string;
  tipoTiro: string;
  armasSolicitudes: SolicitudArma[];
  url: string;
}
