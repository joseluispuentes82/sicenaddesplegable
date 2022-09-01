import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Arma } from "src/app/armas/models/arma";
import { ArmaImpl } from "src/app/armas/models/arma-impl";
import { SolicitudCalendario } from "src/app/calendarios/models/solicitud-calendario";
import { SolicitudCalendarioImpl } from "src/app/calendarios/models/solicitud-calendario-impl";
import { Categoria } from "src/app/categorias/models/categoria";
import { CategoriaImpl } from "src/app/categorias/models/categoria-impl";
import { Recurso } from "src/app/recursos/models/recurso";
import { RecursoImpl } from "src/app/recursos/models/recurso-impl";
import { AppConfigService } from "src/app/services/app-config.service";
import { TipoFormularioImpl } from "src/app/tiposFormulario/models/tipoFormulario-impl";
import { Unidad } from "src/app/unidades/models/unidad";
import { UnidadImpl } from "src/app/unidades/models/unidad-impl";
import { UsuarioGestorImpl } from "src/app/usuarios/models/usuarioGestor-impl";
import { UsuarioNormalImpl } from "src/app/usuarios/models/usuarioNormal-impl";
import { environment } from "src/environments/environment";
import { SolicitudArma } from "../models/solicitud-arma";
import { SolicitudArmaImpl } from "../models/solicitud-arma-impl";
import { SolicitudRecurso } from "../models/solicitud-recurso";
import { SolicitudRecursoImpl } from "../models/solicitud-recurso-impl";

@Injectable({
  providedIn: "root",
})
export class SolicitudRecursoService {
  /**
   * hots de la aplicacion Sicenad
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint de las solicitudes de Recursos
   */
  private urlEndPoint: string = `${this.host}solicitudes/`;

  /**
   * 
   * @param http para los metodos del servicio Http
   * @param appConfigService para las variables del properties
   */
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}solicitudes/`;
  }

  /**
   * método que pasándole el endpoint devuele el id de un objeto
   * @param url endpoint del objeto
   * @returns su id
   */
  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }

  /**
   * método que pasándole el endpoint obtiene un recurso
   * @param url endpoint del objeto Recurso
   * @returns objeto Recurso
   */
  getRecursoUrl(url: string): Observable<Recurso> {
    return this.http.get<Recurso>(`${url}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  /**
   * método que pasándole el endpoint obtiene una solicitud
   * @param url endopoint de una solicitud
   * @returns objeto SolicitudRecurso
   */
  getSolicitudUrl(url: string): Observable<SolicitudRecurso> {
    return this.http.get<SolicitudRecurso>(`${url}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que pasándole el endpoint obtiene una solicitud
   * @param url endpoint del arma
   * @returns objeto Arma
   */
  getArmaUrl(url: string): Observable<Arma> {
    return this.http.get<Arma>(`${url}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que pasándole el su id obtiene una solicitud
   * @param id de una solicitudCalendario
   * @returns solicitud
   */
  getSolicitudCalendario(id: string): Observable<SolicitudCalendario> {
    return this.http.get<SolicitudCalendario>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que pasándole el su id obtiene una solicitud
   * @param id de una solicitud
   * @returns objeto solicitud
   */
  getSolicitud(id: string): Observable<SolicitudRecurso> {
    return this.http.get<SolicitudRecurso>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que obtiene todas las Armas
   * @returns un observable de armas
   */
  getArmas(): Observable<any> {
    return this.http.get<any>(`${this.host}armas?page=0&size=1000`);
  }

  /**
   * método que obtiene todas las solicitudesArmas
   * @returns un observable de solicitudesArmas
   */
  getSolicitudesArmas(): Observable<any> {
    return this.http.get<any>(`${this.host}solicitudesArmas?page=0&size=1000`);
  }

  /**
   * metodo que obtiene todas las solicituesArmas de una solicitudRecurso
   * @param idSolicitud string que contiene el id de la solicitud
   * @returns un observable de las solicitudesArmas de la solicitud
   */
  getSolicitudesArmasDeSolicitud(idSolicitud: string): Observable<any> {
    return this.http.get<any>(`${this.host}solicitudes/${idSolicitud}/solicitudesArmas?page=0&size=1000`);
  }

  /**
   * método que obtiene todas las unidades
   * @returns un observable de todas las unidades
   */
  getUnidades(): Observable<any> {
    return this.http.get<any>(`${this.host}unidades?page=0&size=1000`);
  }

  /**
   * método que obtiene todas las solicitudes
   * @returns un observable de todas las solicitudes
   */
  getSolicitudes(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * método que pasándole el id de un Cenad, obtiene todas sus solicitudes
   * @param idCenad string que contiene el id del cenad
   * @returns un observable de todas las solicitudes del cenad
   */
  getSolicitudesDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/solicitudes?page=0&size=1000`
    );
  }

  /**
   * método que pasándole el id de un Cenad y un estado, obtiene todas sus solicitudes
   * @param idCenad string que contiene el id del cenad
   * @param estado string que contiene el estado de la solicitud a obtener
   * @returns un observable de las solicitudes
   */
  getSolicitudesDeCenadEstado(idCenad: string, estado: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/solicitudesEstado/${estado}?page=0&size=1000`
    );
  }

  /**
   * método que pasándole el id de un Cenad, obtiene todas sus categorías
   * @param idCenad que contiene el id del cenad
   * @returns un observable de las categorias del cenad
   */
  getCategoriasDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/categorias?page=0&size=1000`
    );
  }

  /**
   * método que obtiene de un observable de la API  un array [] de Armas
   * @param respuestaApi observable de la API
   * @returns un array de Armas
   */
  extraerArmas(respuestaApi: any): Arma[] {
    const armas: Arma[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.armas.forEach((s) => {
        armas.push(this.mapearArma(s));
      });
    }
    return armas;
  }

  /**
   * método que extrae un array [] de SolicitudesArmas
   * @param respuestaApi observable de la API
   * @returns un array de SolicitudesArmas
   */
  extraerSolicitudesArmas(respuestaApi: any): SolicitudArma[] {
    const solicitudesArmas: SolicitudArma[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.solicitudesArmas.forEach((s) => {
        solicitudesArmas.push(this.mapearSolicitudArma(s));
      });
    }
    return solicitudesArmas;
  }


  /**
   * método que extrae un array [] de Unidades
   * @param respuestaApi observable de la API
   * @returns un array de Unidades
   */
  extraerUnidades(respuestaApi: any): Unidad[] {
    const unidades: Unidad[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.unidades.forEach((s) => {
        unidades.push(this.mapearUnidad(s));
      });
    }
    return unidades;
  }

  /**
   * método que extrae un array [] de Categorias
   * @param respuestaApi observable de la API
   * @returns un array de Categorias
   */
  extraerCategorias(respuestaApi: any): Categoria[] {
    const categorias: Categoria[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.categorias.forEach((s) => {
        categorias.push(this.mapearCategoria(s));
      });
    }
    return categorias;
  }

  /**
   * método que extrae un array [] de SolicitudesCalendario
   * @param respuestaApi observable de la API
   * @returns un array de SolicitudesCalendario
   */
  extraerSolicitudesCalendario(respuestaApi: any): any[] {
    const solicitudes: any[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.solicitudes.forEach((s) => {
        solicitudes.push(this.mapearSolicitudCalendarioCenad(s));
      });
    }
    return solicitudes;
  }

  /**
   * método que extrae un array [] de SolicitudesCalendario
   * @param respuestaApi observable de la API
   * @returns un array de SolicitudesCalendario
   */
  extraerSolicitudesPlanificadas(respuestaApi: any): SolicitudCalendario[] {
    const solicitudes: SolicitudCalendario[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.solicitudes.forEach((s) => {
        solicitudes.push(this.mapearSolicitudPlanificada(s));
      });
    }
    return solicitudes;
  }

  /**
   * método que extrae un array [] de SolicitudesRecurso
   * @param respuestaApi observable de la API
   * @returns un array de solicitudesRecurso
   */
  extraerSolicitudes(respuestaApi: any): SolicitudRecurso[] {
    const solicitudes: SolicitudRecurso[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.solicitudes.forEach((s) => {
        solicitudes.push(this.mapearSolicitud(s));
      });
    }
    return solicitudes;
  }

  /**
   * método que mapea un objeto Arma con un registro de la entidad
   * @param armaApi observable de la API
   * @returns un objeto mapeado Arma
   */
  mapearArma(armaApi: any): ArmaImpl {
    const arma = new ArmaImpl();
    arma.url = armaApi._links.self.href;
    arma.idArma = this.getId(arma.url);
    arma.nombre = armaApi.nombre;
    arma.tipoTiro = armaApi.tipoTiro;

    return arma;
  }

  /**
   * método que mapea un objeto SolicitudArma con un registro de la entidad
   * @param solicitudArmaApi observable de la API
   * @returns un objeto mapeado SolicitudArma
   */
  mapearSolicitudArma(solicitudArmaApi: any): SolicitudArmaImpl {
    const solicitudArma: SolicitudArma = new SolicitudArmaImpl();
    solicitudArma.url = solicitudArmaApi._links.self.href;
    solicitudArma.idSolicitudArma = this.getId(solicitudArma.url);
    solicitudArma.coordXAsentamiento = solicitudArmaApi.coordXAsentamiento;
    solicitudArma.coordYAsentamiento = solicitudArmaApi.coordYAsentamiento;
    solicitudArma.coordXPuntoCaida = solicitudArmaApi.coordXPuntoCaida;
    solicitudArma.coordYPuntoCaida = solicitudArmaApi.coordYPuntoCaida;
    solicitudArma.alcanceMax = solicitudArmaApi.alcanceMax;
    solicitudArma.zonaSegAngulo = solicitudArmaApi.zonaSegAngulo;
    solicitudArma.armaUrl = solicitudArmaApi._links.arma.href;
    solicitudArma.solicitudUrl = solicitudArmaApi._links.solicitud.href;
    this.getSolicitudUrl(solicitudArma.solicitudUrl).subscribe((response) => {
      solicitudArma.solicitudId = this.mapearSolicitud(response).idSolicitud;
    });
    this.getArmaUrl(solicitudArma.armaUrl).subscribe((response) => {
      solicitudArma.armaId = this.mapearArma(response).idArma;
    });

    return solicitudArma;
  }

  /**
   * metodo que mapea un objeto solicitud (para el calendario) con un registro de la entidad solicitudRecurso
   * @param solicitudApi observable de la API
   * @returns un objeto solicitud
   */
  mapearSolicitudCalendarioCenad(solicitudApi: any): any {
    let title: string = "";
    let recurso: string = "";
    let usuario: string = "";
    const idUnidad: string = "";
    const idRecurso: string = "";
    const idGestorRecurso: string = "";
    const urlUsuarioNormal: string = solicitudApi._links.usuarioNormal.href;
    const observacionesCenad: string = solicitudApi.observacionesCenad;
    const urlRecurso: string = solicitudApi._links.recurso.href;
    const url: string = solicitudApi._links.self.href;
    const id: string = this.getId(url);
    const estado: string = solicitudApi.estado;
    const unidadUsuaria: string = solicitudApi.unidadUsuaria;
    const start: Date = this.cambiarFormatoDate2(solicitudApi.fechaHoraInicioRecurso.toString());
    const end: Date = this.cambiarFormatoDate2(solicitudApi.fechaHoraFinRecurso.toString());
    const color: string = solicitudApi.etiqueta;
    const textColor: string = "black";

    const solicitud = { id, estado, start, end, color, observacionesCenad, url, recurso, textColor, idRecurso, title, urlRecurso, idGestorRecurso, urlUsuarioNormal, usuario, unidadUsuaria, idUnidad };

    return solicitud;
  }


  /**
   * método que recibe como parámetro un dato tipo string y devuelve un dato tipo Date 
   * con el formato 'yyyy-MM-dd HH:mm:ss'
   * @param date string que contiene un dato con formato fecha 'yyyy-MM-dd HH:mm:ss'
   * @returns un dato con formato fecha Date
   */
  cambiarFormatoDate2(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }

  /**
   * método que mapea un objeto solicitud con un registro de la entidad
   * @param solicitudApi un observable de la API
   * @returns un objeto mapeado SolicitudCalendario
   */
  mapearSolicitudPlanificada(solicitudApi: any): SolicitudCalendarioImpl {
    const solicitud: SolicitudCalendario = new SolicitudCalendarioImpl();
    solicitud.url = solicitudApi._links.self.href;
    solicitud.id = this.getId(solicitud.url);
    solicitud.estado = solicitudApi.estado;
    solicitud.observacionesCenad = solicitudApi.observacionesCenad;
    solicitud.fechaSolicitud = solicitudApi.fechaSolicitud;
    solicitud.fechaHoraInicioRecurso = solicitudApi.fechaHoraInicioRecurso;
    solicitud.fechaHoraFinRecurso = solicitudApi.fechaHoraFinRecurso;
    solicitud.unidadUsuaria = solicitudApi.unidadUsuaria;
    this.getRecursoDeSolicitud(solicitud.id).subscribe((response) => {
      solicitud.recurso = this.mapearRecurso(response);
    });
    solicitud.etiqueta = solicitudApi.etiqueta;

    return solicitud;
  }

  /**
   * método que mapea un objeto solicitud con un registro de la entidad
   * @param solicitudApi un observable de la API
   * @returns un objeto mapeado SolicitudRecurso
   */
  mapearSolicitud(solicitudApi: any): SolicitudRecursoImpl {
    const solicitud: SolicitudRecurso = new SolicitudRecursoImpl();
    solicitud.estado = solicitudApi.estado;
    solicitud.url = solicitudApi._links.self.href;
    solicitud.idSolicitud = this.getId(solicitud.url);
    solicitud.observaciones = solicitudApi.observaciones;
    solicitud.observacionesCenad = solicitudApi.observacionesCenad;
    solicitud.jefeUnidadUsuaria = solicitudApi.jefeUnidadUsuaria;
    solicitud.pocEjercicio = solicitudApi.pocEjercicio;
    solicitud.tlfnRedactor = solicitudApi.tlfnRedactor;
    solicitud.fechaSolicitud = solicitudApi.fechaSolicitud;
    solicitud.fechaUltModSolicitud = solicitudApi.fechaUltModSolicitud;
    solicitud.fechaHoraInicioRecurso = solicitudApi.fechaHoraInicioRecurso;
    solicitud.fechaHoraFinRecurso = solicitudApi.fechaHoraFinRecurso;
    solicitud.fechaFinDocumentacion = solicitudApi.fechaFinDocumentacion;
    solicitud.unidadUsuaria = solicitudApi.unidadUsuaria;

    this.getUsuarioNormalDeSolicitud(solicitud.idSolicitud).subscribe((response) => {
      solicitud.usuarioNormal = this.mapearUsuarioNormal(response);
    });

    this.getRecursoDeSolicitud(solicitud.idSolicitud).subscribe((response) => {
      solicitud.recurso = this.mapearRecurso(response);
    });
    solicitud.etiqueta = solicitudApi.etiqueta;
    //DATOS ESPECIFICOS
    // ZONA DE CAIDA DE PROYECTILES/EXPLOSIVOS
    solicitud.conMunTrazadoraIluminanteFumigena = solicitudApi.conMunTrazadoraIluminanteFumigena;
    // CAMPO DE TIRO DE CARROS, VCI/C, PRECISICION
    solicitud.tipoEjercicio = solicitudApi.tipoEjercicio;
    solicitud.armaPral = solicitudApi.armaPral;
    solicitud.armaPrpalNumDisparosPrev = solicitudApi.armaPrpalNumDisparosPrev;
    solicitud.armaSecund = solicitudApi.armaSecund;
    solicitud.armaSecundNumDisparosPrev = solicitudApi.armaSecundNumDisparosPrev;
    // CAMPO DE TIRO LASER (se han creado hasta 5 tipos de blancos para hacerlo
    // compatible con cualquier CENAD/CMT)
    solicitud.numBlancosFijosA = solicitudApi.numBlancosFijosA;
    solicitud.numBlancosFijosB = solicitudApi.numBlancosFijosB;
    solicitud.numBlancosFijosC = solicitudApi.numBlancosFijosC;
    solicitud.numBlancosFijosD = solicitudApi.numBlancosFijosD;
    solicitud.numBlancosFijosE = solicitudApi.numBlancosFijosE;
    solicitud.numBlancosMovilesA = solicitudApi.numBlancosMovilesA;
    solicitud.numBlancosMovilesB = solicitudApi.numBlancosMovilesB;
    solicitud.numBlancosMovilesC = solicitudApi.numBlancosMovilesC;
    solicitud.numBlancosMovilesD = solicitudApi.numBlancosMovilesD;
    solicitud.numBlancosMovilesE = solicitudApi.numBlancosMovilesE;
    // CAMPO DE TIRO
    solicitud.arma1CT = solicitudApi.arma1CT;
    solicitud.arma1CTlongitud = solicitudApi.arma1CTlongitud;
    solicitud.arma2CT = solicitudApi.arma2CT;
    solicitud.arma2CTlongitud = solicitudApi.arma2CTlongitud;
    // CAMPO EXPLOSIVOS
    solicitud.explosivo = solicitudApi.explosivo;
    // POLIGONO DE COMBATE EN ZONAS URBANAS
    // no tiene atributos específicos

    // COMBATE URBANO
    // no tiene atributos específicos

    // TORRE MULTIUSOS
    // no tiene atributos específicos

    // CASA 3 ALTURAS
    // no tiene atributos específicos

    // PISTA DE CONDUCCION TT/OBSTACULOS
    // no tiene atributos específicos

    // EJERCICIOS ZONA RESTRINGIDA
    solicitud.actividad = solicitudApi.actividad;
    // LOGISTICA
    // ACANTONAMIENTO/VIVAC
    solicitud.vivac = solicitudApi.vivac;
    // ZONA DE VIDA DE BATALLON
    solicitud.conUsoCocina = solicitudApi.conUsoCocina;
    solicitud.numPersonasZVB = solicitudApi.numPersonasZVB;
    // ZONA DE ESPERA
    solicitud.numPersonasZE = solicitudApi.numPersonasZE;
    // LAVADEROS
    solicitud.numVehCadenas = solicitudApi.numVehCadenas;
    solicitud.numVehRuedas = solicitudApi.numVehRuedas;
    // SIMULACION REAL LASER
    solicitud.fechaHoraMontaje = solicitudApi.fechaHoraMontaje;
    solicitud.fechaHoraDesmontaje = solicitudApi.fechaHoraDesmontaje;
    solicitud.numSimuladores = solicitudApi.numSimuladores;
    solicitud.usoEstacionSeg = solicitudApi.usoEstacionSeg;
    // OTROS RECURSOS
    // no contiene atributos específicos
    solicitud.otrosDatosEspecificos = solicitudApi.otrosDatosEspecificos;

    return solicitud;
  }

  /**
   * método que pasándole un objeto solicitud crea un registro en la entidad
   * @param solicitudArma objeto solicitudArma
   * @returns un observable de la API
   */
  createSolicitudArma(solicitudArma: SolicitudArma): Observable<any> {
    return this.http.post(`${this.host}solicitudesArmas`, solicitudArma).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que pasándole un objeto solicitud crea un registro en la entidad
   * @param solicitud objeto SolicitudCalendario
   * @returns un observable de la API 
   */
  createSolicitudCalendario(solicitud: SolicitudCalendario): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, solicitud).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que pasándole un objeto solicitud crea un registro en la entidad
   * @param solicitud objeto SolicitudRecurso
   * @returns un observable de la API
   */
  create(solicitud: SolicitudRecurso): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, solicitud).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que pasándole un objeto solicitud, borra su registro de la entidad
   * @param solicitudArma objeto solicitudArma
   * @returns un observable de la API
   */
  deleteSolicitudArma(solicitudArma: SolicitudArmaImpl): Observable<SolicitudArma> {
    return this.http
      .delete<SolicitudArma>(`${this.host}solicitudesArmas/${solicitudArma.idSolicitudArma}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error("El metodo está bien hecho");
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole un objeto solicitud, borra su registro de la entidad
   * @param solicitud objeto solicitudCalendario
   * @returns un observable de la API
   */
  deleteSolicitudCalendario(solicitud: SolicitudCalendario): Observable<SolicitudCalendario> {
    return this.http
      .delete<SolicitudCalendario>(`${this.urlEndPoint}${solicitud.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error("El metodo está bien hecho");
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole un objeto solicitud, borra su registro de la entidad
   * @param solicitud objeto solicitudRecurso
   * @returns un observable de la API
   */
  delete(solicitud: SolicitudRecurso): Observable<SolicitudRecurso> {
    return this.http
      .delete<SolicitudRecurso>(`${this.urlEndPoint}${solicitud.idSolicitud}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error("El metodo está bien hecho");
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole un objeto solicitud, actualiza su registro en la entidad
   * @param solicitudArma objeto solicitudArma
   * @returns un observable de la API
   */
  updateSolicitudArma(solicitudArma: SolicitudArmaImpl): Observable<any> {
    return this.http
      .patch<any>(`${this.host}solicitudesArmas/${solicitudArma.idSolicitudArma}`, solicitudArma)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole un objeto solicitud, actualiza su registro en la entidad
   * @param idSolicitud string que contiene el id de la solicitud
   * @param solicitud objeto solicitudCalendario
   * @returns un observable de la API
   */
  updateSolicitudCalendario(idSolicitud: string, solicitud: SolicitudCalendario): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${idSolicitud}`, solicitud)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole un objeto solicitud, actualiza su registro en la entidad
   * @param idSolicitud string que contiene el id de la solicitud
   * @param solicitud objeto solicitudRecurso
   * @returns un observable de la API
   */
  update(idSolicitud: string, solicitud: SolicitudRecurso): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${idSolicitud}`, solicitud)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole el id de una solicitud, obtiene un objeto UsuarioNormal
   * @param idSolicitud string que contiene el id de la solicitud
   * @returns un observable de la API
   */
  getUsuarioNormalDeSolicitud(idSolicitud: string): Observable<any> {
    return this.http
      .get<any>(`${this.urlEndPoint}${idSolicitud}/usuarioNormal`)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole el id de un usuario, devuelve su objeto Unidad
   * @param idUsuario string que contiene el id del usuario
   * @returns un observable de la API
   */
  getUnidadDeUsuarioNormal(idUsuario: string): Observable<any> {
    return this.http
      .get<any>(`${this.host}usuarios_normal/${idUsuario}/unidad`)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que mapea un objeto UsuarioNormal con un registro de la entidad
   * @param usuarioNormalApi un observable de la API
   * @returns un objeto UsuarioNormal mapeado
   */
  mapearUsuarioNormal(usuarioNormalApi: any): UsuarioNormalImpl {
    const usuarioNormal = new UsuarioNormalImpl();
    usuarioNormal.url = usuarioNormalApi._links.self.href;
    usuarioNormal.idUsuario = this.getId(usuarioNormal.url);
    usuarioNormal.nombre = usuarioNormalApi.nombre;
    usuarioNormal.descripcion = usuarioNormalApi.descripcion;
    usuarioNormal.email = usuarioNormalApi.email;
    usuarioNormal.password = usuarioNormalApi.password;
    usuarioNormal.tfno = usuarioNormalApi.tfno;
    usuarioNormal.tipo = usuarioNormalApi.tipo;
    this.getUnidadDeUsuarioNormal(usuarioNormal.idUsuario).subscribe(
      (response) => {
        usuarioNormal.unidad = this.mapearUnidad(response);
      }
    );

    return usuarioNormal;
  }

  /**
   * método que mapea un objeto Unidad con un registro de la entidad
   * @param unidadApi un observable de la API
   * @returns un objeto Unidad mapeado
   */
  mapearUnidad(unidadApi: any): UnidadImpl {
    const unidad = new UnidadImpl();
    unidad.url = unidadApi._links.self.href;
    unidad.idUnidad = this.getId(unidad.url);
    unidad.nombre = unidadApi.nombre;
    unidad.email = unidadApi.email;
    unidad.tfno = unidadApi.tfno;
    unidad.direccion = unidadApi.direccion;
    unidad.poc = unidadApi.poc;

    return unidad;
  }

  /**
   * método que pasándole el id de una solicitud devuelve su objeto Recurso
   * @param idSolicitud string que contiene el id de la solicitud
   * @returns un observable de la API
   */
  getRecursoDeSolicitud(idSolicitud: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idSolicitud}/recurso`).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * método que mapea un objeto Recurso con un registro de la entidad
   * @param recursoApi un observable de la API
   * @returns un objeto Recurso mapeado
   */
  mapearRecurso(recursoApi: any): RecursoImpl {
    const recurso = new RecursoImpl();
    recurso.url = recursoApi._links.self.href;
    recurso.idRecurso = this.getId(recurso.url);
    recurso.nombre = recursoApi.nombre;
    recurso.descripcion = recursoApi.descripcion;
    recurso.otros = recursoApi.otros;
    this.getTipoFormulario(recurso.idRecurso).subscribe((response) => {
      recurso.tipoFormulario = this.mapearTipoFormulario(response);
    });
    this.getUsuarioGestor(recurso.idRecurso).subscribe((response) => {
      recurso.usuarioGestor = this.mapearUsuario(response);
    });
    this.getCategoria(recurso.idRecurso).subscribe((response) => {
      recurso.categoria = this.mapearCategoria(response);
    });
    recurso.conDatosEspecificosSolicitud = recursoApi.conDatosEspecificosSolicitud;
    recurso.datosEspecificosSolicitud = recursoApi.datosEspecificosSolicitud;

    return recurso;
  }

  /**
   * método que pasándole el id de un recurso, obtiene su registro UsuarioGestor de la entidad
   * @param idRecurso string que contiene el id del recurso
   * @returns un observable de la API
   */
  getUsuarioGestor(idRecurso: string): Observable<any> {
    return this.http
      .get<any>(`${this.host}recursos/${idRecurso}/usuarioGestor`)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**método que pasándole el id de una recurso, obtiene su registro Categoría de la entidad
   * 
   * @param idRecurso strin que contiene el id del recurso
   * @returns un observable de la API
   */
  getCategoria(idRecurso: string): Observable<any> {
    return this.http
      .get<any>(`${this.host}recursos/${idRecurso}/categoria`)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que pasándole el id de un recurso, obtiene su registro TipoFormulario de la entidad
   * @param idRecurso string que contiene el id del recurso
   * @returns un observable de la API
   */
  getTipoFormulario(idRecurso: string): Observable<any> {
    return this.http
      .get<any>(`${this.host}recursos/${idRecurso}/tipoFormulario`)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  /**
   * método que mapea un objeto TipoFormulario con un registro de la entidad
   * @param tipoRecursoApi un observable de la API
   * @returns un objeto TipoFormulario mapeado
   */
  mapearTipoFormulario(tipoRecursoApi: any): TipoFormularioImpl {
    const tipoFormuario = new TipoFormularioImpl();
    tipoFormuario.nombre = tipoRecursoApi.nombre;
    tipoFormuario.descripcion = tipoRecursoApi.descripcion;
    tipoFormuario.codTipo = tipoRecursoApi.codTipo;
    tipoFormuario.url = tipoRecursoApi._links.self.href;
    tipoFormuario.idTipoFormulario = tipoFormuario.getId(tipoFormuario.url);

    return tipoFormuario;
  }

  /**
   * método que mapea un objeto Usuario con un registro de la entidad
   * @param usuarioApi un observable de la API
   * @returns un objeto UsuarioGestor mapeado
   */
  mapearUsuario(usuarioApi: any): UsuarioGestorImpl {
    const usuario = new UsuarioGestorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);

    return usuario;
  }

  /**
   * método que mapea un objeto Categoría con un registro de la entidad
   * @param categoriaApi un observable de la API
   * @returns un objeto Categoria mapeado
   */
  mapearCategoria(categoriaApi: any): CategoriaImpl {
    const categoria = new CategoriaImpl();
    categoria.nombre = categoriaApi.nombre;
    categoria.descripcion = categoriaApi.descripcion;
    categoria.url = categoriaApi._links.self.href;
    categoria.idCategoria = categoria.getId(categoria.url);

    return categoria;
  }

  /**
   * metodo que envia las notificaciones por cambio de estado
   * @param solicitud objeto solicitudRecurso
   * @returns un observable de la API
   */
  enviarNotificacionCambioDeEstado(solicitud: SolicitudRecurso): Observable<any> {
    console.log('servicio');
    return this.http.get<any>(`${this.host}notificar/${solicitud.idSolicitud}`);
  }
}


