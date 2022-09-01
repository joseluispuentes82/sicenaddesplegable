import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { AppConfigService } from 'src/app/services/app-config.service';
import { SolicitudRecurso } from 'src/app/solicitudes-recursos/models/solicitud-recurso';
import { SolicitudRecursoImpl } from 'src/app/solicitudes-recursos/models/solicitud-recurso-impl';
import { UsuarioAdministradorImpl } from 'src/app/usuarios/models/usuarioAdministrador-impl';
import { environment } from 'src/environments/environment';
import { Cenad } from '../models/cenad';
import { CenadImpl } from '../models/cenad-impl';

@Injectable({
  providedIn: 'root'
})
export class CenadService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de los cenads
   */
  private urlEndPoint: string = `${this.host}cenads/`;
  /**
   * endpoint para almacenamiento de archivos
   */
  private urlFiles = `${this.host}files/`;

  /**
   *
   * @param http Para usar los metodos propios de HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(private http: HttpClient,
              private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}cenads/`;
    this.urlFiles = `${this.host}files/`;

  }

  /**
   * metodo para subir un archivo de escudo
   * @param file Archivo a subir
   */
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlFiles}subirEscudo`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req).pipe(
      catchError((e) => {
        if (e.status === 413) {
          alert("El archivo tiene un tamaño superior al permitido");
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
   * metodo para subir un archivo de infoCenad
   * @param file Archivo a subir
   * @param idCenad Id del Cenad
   */  
  uploadInfo(file: File, idCenad: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlFiles}subirInfoCenad/${idCenad}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req).pipe(
      catchError((e) => {
        if (e.status === 413) {
          alert("El archivo tiene un tamaño superior al permitido");
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
  * metodo para borrar un archivo de la subcarpeta de un cenad
  * @param fileName Nombre del archivo
  * @param idCenad Id del Cenad
  */
 delete_Archivo(fileName: string, idCenad: string): Observable<any> {
  return this.http.get(`${this.urlFiles}borrarInfoCenad/${idCenad}/${fileName}`).pipe(
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
   * metodo para borrar un archivo
   * @param fileName Nombre del archivo
   */
  deleteArchivo(fileName: string): Observable<any> {
    return this.http.get(`${this.urlFiles}borrarEscudo/${fileName}`).pipe(
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
   * metodo para borrar la carpeta con las cartografias de un CENAD
   * @param idCenad Id del Cenad
   */
  deleteCartografias(idCenad: string): Observable<any> {
    return this.http.get(`${this.urlFiles}borrarCarpetaCartografia/${idCenad}`).pipe(
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
   * metodo para borrar la carpeta con la infoCenad de un CENAD
   * @param idCenad Id del Cenad
   */
   deleteInfoCenad(idCenad: string): Observable<any> {
    return this.http.get(`${this.urlFiles}borrarCarpetaInfoCenad/${idCenad}`).pipe(
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
   * metodo para borrar la carpeta con los archivos de un recurso
   * @param idRecurso Id del recurso
   */
  deleteCarpetaRecurso(idRecurso: string): Observable<any> {
    return this.http.get(`${this.urlFiles}borrarCarpetaDocRecurso/${idRecurso}`).pipe(
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
   * metodo para borrar la carpeta con los archivos de una solicitud
   * @paramidsolicitud Id de la solicitud
   */
  deleteCarpetaSolicitud(idSolicitud: string): Observable<any> {
    return this.http.get(`${this.urlFiles}borrarCarpetaDocRecurso/${idSolicitud}`).pipe(
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
   * metodo que recupera de la BD todos los cenads
   */
  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de cenads
   * @param respuestaApi [ ] de Cenads API
   * @returns Devuelve un [ ] de Cenad
   */
  extraerCenads(respuestaApi: any): Cenad[] {
    const cenads: Cenad[] = [];
    respuestaApi._embedded.cenads.forEach(c =>
      cenads.push(this.mapearCenad(c)));
    return cenads;
  }

  /**
   * metodo para mapear un cenad segun la interfaz
   * @param cenadApi Cenad API
   * @returns Devuelve un CenadImpl
   */
  mapearCenad(cenadApi: any): CenadImpl {
    const cenad = new CenadImpl();
    cenad.nombre = cenadApi.nombre;
    cenad.descripcion = cenadApi.descripcion;
    cenad.direccion = cenadApi.direccion;
    cenad.escudo = cenadApi.escudo;
    cenad.provincia = cenadApi.provincia;
    cenad.tfno = cenadApi.tfno;
    cenad.infoCenad = cenadApi.infoCenad;
    cenad.email = cenadApi.email;
    cenad.url = cenadApi._links.self.href;
    cenad.idCenad = cenad.getId(cenad.url);
    return cenad;
  }

  /**
   * metodo para mapear un Usuario Administrador segun la interfaz
   * @param usuarioApi Usuario Administrador API
   * @returns Devuelve un UsuarioAdministradorImpl
   */  
  mapearUsuario(usuarioApi: any): UsuarioAdministradorImpl {
    const usuario = new UsuarioAdministradorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.emailAdmitido = usuarioApi.emailAdmitido;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    usuario.tipo = 'administrador';
    return usuario;
  }

  /**
   * metodo para crear un cenad
   * @param cenad Cenad creado
   */
  create(cenad: Cenad): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, cenad).pipe(
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
   * metodo para borrar un cenad
   * @param cenad Cenad
   */
  delete(cenad): Observable<Cenad> {
    return this.http.delete<Cenad>(`${this.urlEndPoint}${cenad.idCenad}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  /**
   * metodo para editar un cenad
   * @param cenad Cenad
   */  
  update(cenad: Cenad): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${cenad.idCenad}`, cenad)
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
   * metodo para recuperar un cenad concreto
   * @paramid Id del Cenad
   */
  getCenad(id): Observable<any> {
    return this.http.get<Cenad>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * metodo para recuperar el administrador de un cenad
   * @param cenad Cenad
   */
  getUsuarioAdministrador(cenad: Cenad): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${cenad.idCenad}/usuarioAdministrador/`)
      .pipe(
        catchError((e) => {
          if (e.status === 404) {
            console.error('Este CENAD/CMT aún no tiene Usuario Administrador');
          }
          return throwError(e);
        })
      );
  }
  
  /**
   * metodo para recuperar el administrador de un cenad
   * @param idCenad Id del Cenad
   */  
  getUsuarioAdministradorCenadId(idCenad: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idCenad}/usuarioAdministrador/`)
      .pipe(
        catchError((e) => {
          if (e.status === 404) {
            console.error('Este CENAD/CMT aún no tiene Usuario Administrador');
          }
          return throwError(e);
        })
      );
  }


  /**
   * metodo para recuperar de la BD los recursos de un cenad
   * @param idCenad Id del Cenad
   */
  getRecursosDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/recursos/?page=0&size=1000`);
  }

  /**
   * metodo para extraer el [ ] de recursos
   * @param respuestaApi [ ] de Recursos API
   * @returns Devuelve un [ ] de Recurso
   */
  extraerRecursos(respuestaApi: any): Recurso[] {
    const recursos: Recurso[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.recursos.forEach(r =>
        recursos.push(this.mapearRecurso(r)));
    }
    return recursos;
  }

  /**
   * metodo para mapear un recurso segun la interfaz
   * @param recursoApi Recurso API
   * @returns Devuelve un RecursoImpl
   */
  mapearRecurso(recursoApi: any): RecursoImpl {
    const recurso = new RecursoImpl();
    recurso.nombre = recursoApi.nombre;
    recurso.descripcion = recursoApi.descripcion;
    recurso.otros = recursoApi.otros;
    recurso.conDatosEspecificosSolicitud = recursoApi.conDatosEspecificosSolicitud;
    recurso.datosEspecificosSolicitud = recursoApi.datosEspecificosSolicitud;
    recurso.url = recursoApi._links.self.href;
    recurso.idRecurso = recurso.getId(recurso.url);
    return recurso;
  }

  /**
   * método que pasándole el id de un Cenad, obtiene todas sus solicitudes
   * @param idCenad Id del Cenad
   */
  getSolicitudesDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/solicitudes?page=0&size=1000`
    );
  }

  /**
   * método que extrae un array [ ] de Solicitudes
   * @param respuestaApi [ ] de Solicitudes API
   * @returns Devuelve un [ ] de SolicitudRecurso
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
   * método que mapea un objeto solicitud con un registro de la entidad
   * @param solicitudApi Solicitud API
   * @returns Devuelve una SolicitudImpl
   */
  mapearSolicitud(solicitudApi: any): SolicitudRecursoImpl {
    const solicitud: SolicitudRecurso = new SolicitudRecursoImpl();
    solicitud.url = solicitudApi._links.self.href;
    solicitud.idSolicitud = this.getId(solicitud.url);
    solicitud.observaciones = solicitudApi.observaciones;
    solicitud.observacionesCenad = solicitudApi.observacionesCenad;
    solicitud.jefeUnidadUsuaria = solicitudApi.jefeUnidadUsuaria;
    solicitud.pocEjercicio = solicitudApi.pocEjercicio;
    solicitud.tlfnRedactor = solicitudApi.tlfnRedactor;
    solicitud.estado = solicitudApi.estado;
    solicitud.fechaSolicitud = solicitudApi.fechaSolicitud;
    solicitud.fechaUltModSolicitud = solicitudApi.fechaUltModSolicitud;
    solicitud.fechaHoraInicioRecurso = solicitudApi.fechaHoraInicioRecurso;
    solicitud.fechaHoraFinRecurso = solicitudApi.fechaHoraFinRecurso;
    solicitud.fechaFinDocumentacion = solicitudApi.fechaFinDocumentacion;
    solicitud.unidadUsuaria = solicitudApi.unidadUsuaria;
    return solicitud;
  }

  /**
   * método que pasándole el endpoint devuele el id de un objeto
   * @param url Url del elemento
   * @returns Devuelve el Id de la url
   */
  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }
}
