import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfigService } from "src/app/services/app-config.service";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";
import { UsuarioNormalImpl } from "src/app/usuarios/models/usuarioNormal-impl";
import { environment } from "src/environments/environment";
import { Unidad } from "../models/unidad";
import { UnidadImpl } from "../models/unidad-impl";

@Injectable({
  providedIn: "root",
})
export class UnidadService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de las unidades
   */
  private urlEndPoint: string = `${this.host}unidades/`;

  /**
   *
   * @param http Para usar metodos de HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {
    this.host = appConfigService.hostSicenad
      ? appConfigService.hostSicenad
      : environment.hostSicenad;
    this.urlEndPoint = `${this.host}unidades/`;
  }

  /**
   * metodo que rescata de la BD todas unidades
   */
  getUnidades(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de unidades
   * @param respuestaApi [ ] de unidades API
   * @returns Devuelve un [ ] de Unidad
   */
  extraerUnidades(respuestaApi: any): Unidad[] {
    const unidades: Unidad[] = [];
    respuestaApi._embedded.unidades.forEach((u) =>
      unidades.push(this.mapearUnidad(u))
    );
    return unidades;
  }

  /**
   * metodo que mapea una unidad segun la interfaz
   * @param unidadApi Unidad API
   * @returns Devuelve una UnidadImpl
   */
  mapearUnidad(unidadApi: any): UnidadImpl {
    const unidad = new UnidadImpl();
    unidad.nombre = unidadApi.nombre;
    unidad.direccion = unidadApi.direccion;
    unidad.email = unidadApi.email;
    unidad.tfno = unidadApi.tfno;
    unidad.poc = unidadApi.poc;
    unidad.url = unidadApi._links.self.href;
    unidad.idUnidad = unidad.getId(unidad.url);
    return unidad;
  }

  /**
   * metodo que materializa la creacion de una unidad
   * @param unidad Unidad que se crea
   */
  create(unidad: Unidad): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, unidad).pipe(
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
   * metodo que materializa la eliminacion de una unidad
   * @param unidad Unidad a eliminar
   */
  delete(unidad): Observable<Unidad> {
    return this.http
      .delete<Unidad>(`${this.urlEndPoint}${unidad.idUnidad}`)
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
   * metodo que materializa la edicion de una unidad
   * @param unidad Unidad a editar
   */
  update(unidad: Unidad): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${unidad.idUnidad}`, unidad)
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
   * metodo que rescata de la BD los usuarios normales que tiene una unidad
   * @param unidad Unidad de la que se obtienen los usuarios
   */
  getUsuariosNormalDeUnidad(unidad: Unidad): Observable<any> {
    return this.http.get<any>(
      `${this.urlEndPoint}${unidad.idUnidad}/usuariosNormal`
    );
  }

  /**
   * metodo que extrae el [ ] de usuarios normal
   * @param respuestaApi [ ] de usuarios normal API
   * @returns Devuelve un [ ] de usuarios normal
   */
  extraerUsuariosNormal(respuestaApi: any): UsuarioNormal[] {
    const usuariosNormal: UsuarioNormal[] = [];
    respuestaApi._embedded.usuarios_normal.forEach((u) =>
      usuariosNormal.push(this.mapearUsuarioNormal(u))
    );
    return usuariosNormal;
  }

  /**
   * metodo que mapea un usuario segun la interfaz
   * @param usuarioApi Usuario API
   * @returns Devuelve un UsuarioNormalImpl
   */
  mapearUsuarioNormal(usuarioApi: any): UsuarioNormalImpl {
    const usuarioNormal = new UsuarioNormalImpl();
    usuarioNormal.nombre = usuarioApi.nombre;
    usuarioNormal.password = usuarioApi.password;
    usuarioNormal.email = usuarioApi.email;
    usuarioNormal.emailAdmitido = usuarioApi.emailAdmitido;
    usuarioNormal.tfno = usuarioApi.tfno;
    usuarioNormal.descripcion = usuarioApi.descripcion;
    usuarioNormal.url = usuarioApi._links.self.href;
    usuarioNormal.idUsuario = usuarioNormal.getId(usuarioNormal.url);
    usuarioNormal.tipo = "normal";
    return usuarioNormal;
  }
}
