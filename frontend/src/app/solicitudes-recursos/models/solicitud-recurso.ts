import { Fichero } from "src/app/recursos/models/fichero";
import { Recurso } from "src/app/recursos/models/recurso";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";
import { SolicitudArma } from "./solicitud-arma";

export interface SolicitudRecurso {
  url: string;
  // COMUNES A TODAS LAS SOLICITUDES
  idSolicitud: string;
	observaciones: string;
	observacionesCenad: string;
	jefeUnidadUsuaria: string;
	pocEjercicio: string;
	tlfnRedactor: string;
	estado: string; // Borrador, Solicitada, Validada, Cancelada, Denegada, Planificada y Aviso
	fechaSolicitud: string;
	fechaUltModSolicitud: string;
	fechaHoraInicioRecurso: string;
	fechaHoraFinRecurso: string;
	fechaFinDocumentacion: string;
	unidadUsuaria: string;
  usuarioNormal: UsuarioNormal | any;
  documentacionCenad: Fichero[];
  documentacionUnidad: Fichero[];
  recurso: Recurso | any;
  etiqueta: string;
  //estos campos no existen en la entidad
  idUsuarioNormal: string;
  idUnidadUsuarioNormal: string;
  idRecurso: string;
  // DATOS ESPECIFICOS
  //Zona Caida Proyectiles/Explosivos
	conMunTrazadoraIluminanteFumigena: boolean;
  solicitudesArmas: SolicitudArma[];

  //Campo Tiro Carros, VCI/C, Precisión
  tipoEjercicio: string;
	armaPral: string;
	armaPrpalNumDisparosPrev: number;
	armaSecund: string;
	armaSecundNumDisparosPrev: number;
  //Campo Tiro Laser
  numBlancosFijosA: number;
	numBlancosFijosB: number;
	numBlancosFijosC: number;
	numBlancosFijosD: number;
	numBlancosFijosE: number;
	numBlancosMovilesA: number;
	numBlancosMovilesB: number;
	numBlancosMovilesC: number;
	numBlancosMovilesD: number;
	numBlancosMovilesE: number;
  //Campo Tiro
  arma1CT: string;
	arma1CTlongitud: number;
	arma2CT: string;
	arma2CTlongitud: number;
  //Campo Explosivos
  explosivo: string;
  //Ejercicio Zona Restringida
  actividad: string;
  //Acantonamiento-Vivac
  vivac: string;
  //Zona de vida Batallón
  conUsoCocina: boolean;
  numPersonasZVB: number;
  //Zona de Espera
  numPersonasZE: number;
  //Lavaderos
  numVehCadenas: number;
	numVehRuedas: number;
  //Simulación Real Láser
	fechaHoraMontaje: string;
	fechaHoraDesmontaje: string;
	numSimuladores: number;
	usoEstacionSeg: string;
  //Otros recursos
  otrosDatosEspecificos: string;
}