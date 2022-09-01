import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UnidadImpl } from 'src/app/unidades/models/unidad-impl';
import { environment } from 'src/environments/environment';
import { UsuarioNormal } from '../models/usuarioNormal';
import { UsuarioNormalImpl } from '../models/usuarioNormal-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioNormalService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de los usuarios normal
   */
  private urlEndPoint: string = `${this.host}usuarios_normal/`;

  /**
   * 
   * @param http Para usar los metodos propios de HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}usuarios_normal/`;
  }

  /**
   * metodo que recupera de la BD todos los usuarios normal
   */
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de usuarios normal
   * @param respuestaApi [ ] de Usuarios normal API
   * @returns Devuelve un [ ] de UsuarioNormal
   */  
  extraerUsuarios(respuestaApi: any): UsuarioNormal[] {
    const usuarios: UsuarioNormal[] = [];
    respuestaApi._embedded.usuarios_normal.forEach(u =>
      usuarios.push(this.mapearUsuario(u)));
    return usuarios;
  }

  /**
   * metodo para mapear un usuario normal segun la interfaz
   * @param usuarioApi Usuario normal API
   * @returns Devuelve un UsuarioNormalImpl
   */  
  mapearUsuario(usuarioApi: any): UsuarioNormalImpl {
    const usuario = new UsuarioNormalImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.emailAdmitido = usuarioApi.emailAdmitido;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    this.getUnidad(usuario.idUsuario).subscribe((response) =>
      usuario.unidad = this.mapearUnidad(response));
    usuario.tipo = 'normal';
    return usuario;
  }

  /**
   * metodo para crear un usuario normal
   * @param usuario Usuario a crear
   */  
  create(usuario: UsuarioNormal): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, usuario).pipe(
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
   * metodo para eliminar un usuario normal
   * @param usuario Usuario a eliminar
   */    
  delete(usuario): Observable<UsuarioNormal> {
    return this.http.delete<UsuarioNormal>(`${this.urlEndPoint}${usuario.idUsuario}`)
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
   * metodo para editar un usuario normal
   * @param usuario Usuario a editar
   */    
  update(usuario: UsuarioNormal): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${usuario.idUsuario}`, usuario)
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
   * metodo para recuperar un usuario normal concreto
   * @param id Id del usuario
   */
    getUsuario(id): Observable<any> {
    return this.http.get<UsuarioNormal>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * metodo que recupera de la BD todas las unidades
   */
  getUnidades(): Observable<any> {
    return this.http.get<any>(`${this.host}unidades/?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de unidades
   * @param respuestaApi [ ] de unidades API
   * @returns Devuelve un [ ] de Unidad
   */
  extraerUnidades(respuestaApi: any): Unidad[] {
    const unidades: Unidad[] = [];
    respuestaApi._embedded.unidades.forEach(u =>
      unidades.push(this.mapearUnidad(u)));
    return unidades;
  }

  /**
   * metodo para mapear una unidad segun la interfaz
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
   * metodo que rescata de la BD la unidad del usuarioNormal seleccionado
   * @param idUsuario Id del usuario
   */
  getUnidad(idUsuario: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idUsuario}/unidad/`);
  }
}