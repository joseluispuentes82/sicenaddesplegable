import { SolicitudArma } from "src/app/solicitudes-recursos/models/solicitud-arma";
import { Arma } from "./arma";

export class ArmaImpl implements Arma {
  idArma: string;
  nombre: string;
  tipoTiro: string;
  armasSolicitudes: SolicitudArma[];
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf("/") + 1, url.length);
  }
}
