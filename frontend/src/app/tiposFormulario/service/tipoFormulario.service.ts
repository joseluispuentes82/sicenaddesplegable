import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { TipoFormulario } from '../models/tipoFormulario';
import { TipoFormularioImpl } from '../models/tipoFormulario-impl';

@Injectable({
  providedIn: 'root'
})
export class TipoFormularioService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**endpoint especifico de los tipos de formulario
   */
  private urlEndPoint: string = `${this.host}tipos_formulario/`;

  /**
   *
   * @param http Para usar los metodos HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}tipos_formulario/`;
   }

  /**
   * metodo que rescata de la BD todos los tipos de formulario
   */
  getTiposFormulario(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de tipos de formulario
   * @param respuestaApi [ ] de tipos de formulario API
   * @return Devuelve un [ ] de TipoFormulario
   */
  extraerTiposFormulario(respuestaApi: any): TipoFormulario[] {
    const tiposFormulario: TipoFormulario[] = [];
    respuestaApi._embedded.tipos_formulario.forEach(t =>
      tiposFormulario.push(this.mapearTipoFormulario(t)));
    return tiposFormulario;
  }

  /**
   * metodo que mapea un tipo de formulario segun la interfaz
   * @param tipoFormularioApi tipo de formulario API
   * @return Devuelve un TipoFormularioImpl
   */
  mapearTipoFormulario(tipoFormularioApi: any): TipoFormularioImpl {
    const tipoFormulario = new TipoFormularioImpl();
    tipoFormulario.nombre = tipoFormularioApi.nombre;
    tipoFormulario.descripcion = tipoFormularioApi.descripcion;
    tipoFormulario.codTipo = tipoFormularioApi.codTipo;
    tipoFormulario.url = tipoFormularioApi._links.self.href;
    tipoFormulario.idTipoFormulario = tipoFormulario.getId(tipoFormulario.url);
    return tipoFormulario;
  }

  /**
   * metodo que materializa la creacion de un tipo de formulario
   * @param tipoFormulario Tipo de Formulario creado
   */
  create(tipoFormulario: TipoFormulario): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, tipoFormulario).pipe(
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
   * metodo que materializa la eliminacion de un tipo de formulario
   * @param tipoFormulario Tipo de formulario a eliminar
   */
  delete(tipoFormulario): Observable<TipoFormulario> {
    return this.http.delete<TipoFormulario>(`${this.urlEndPoint}${tipoFormulario.idTipoFormulario}`)
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
   * metodo que materializa la edicion de un tipo de formulario
   * @param tipoFormulario Tipo de formulario a editar
   */
  update(tipoFormulario: TipoFormulario): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${tipoFormulario.idTipoFormulario}`, tipoFormulario)
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
   * metodo que rescata de la BD los recursos que tienen un tipo de formulario
   * @param tipoFormulario Tipo de formulario del que queremos saber los recursos
   */
  getRecursosDeTipoFormulario(tipoFormulario: TipoFormulario): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${tipoFormulario.idTipoFormulario}/recursos`);
  }

  /**
   * metodo que extrae el [ ] de recursos
   * @param respuestaApi [ ] de recursos API
   * @returns Devuelve un [ ] de recursos
   */
  extraerRecursos(respuestaApi: any): Recurso[] {
    const recursos: Recurso[] = [];
    respuestaApi._embedded.recursos.forEach(r =>
      recursos.push(this.mapearRecurso(r)));
    return recursos;
  }

  /**
   * metodo que mapea un recurso segun la interfaz
   * @param recursoApi Recurso API
   * @returnsDevuelve un RecursoImpl
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
}
