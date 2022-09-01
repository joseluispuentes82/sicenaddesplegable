import { SolicitudArma } from "./solicitud-arma";

export class SolicitudArmaImpl implements SolicitudArma {
  url: string;
  idSolicitudArma: string;
  coordXAsentamiento: number;
  coordYAsentamiento: number;
  coordXPuntoCaida: number;
  coordYPuntoCaida: number;  
	alcanceMax: number;
	zonaSegAngulo: number;
  armaUrl: string;
  arma: string;
  solicitudUrl: string;
  armaId: string;
  solicitudId: string;
  solicitud: string;

  constructor() {}

}
