import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { UsuarioAdministrador } from '../models/usuarioAdministrador';
import { UsuarioAdministradorImpl } from '../models/usuarioAdministrador-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAdministradorService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de los usuarios administrador
   */
  private urlEndPoint: string = `${this.host}usuarios_administrador/`;

  /**
   * 
   * @param http Para usar los metodos propios de HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}usuarios_administrador/`;
   }

  /**
   * metodo que recupera de la BD todos los usuarios administrador
   */
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de usuarios administrador
   * @param respuestaApi [ ] de Usuarios administrador API
   * @returns Devuelve un [ ] de UsuarioAdministrador
   */
  extraerUsuarios(respuestaApi: any): UsuarioAdministrador[] {
    const usuarios: UsuarioAdministrador[] = [];
    respuestaApi._embedded.usuarios_administrador.forEach(u => 
      usuarios.push(this.mapearUsuario(u)));
    return usuarios;
  }

  /**
   * metodo para mapear un usuario administrador segun la interfaz
   * @param usuarioApi Usuario Administrador API
   * @returns Devuelve un UsuarioAdministradorImpl
   */
  mapearUsuario(usuarioApi: any): UsuarioAdministradorImpl {
    const usuario = new UsuarioAdministradorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.emailAdmitido = usuarioApi.emailAdmitido;console.log()
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    this.getCenad(usuario).subscribe((response) => usuario.cenad = this.mapearCenad(response));
    usuario.tipo = 'administrador';
    return usuario;
  }

  /**
   * metodo para crear un usuario administrador
   * @param usuario Usuario a crear
   */
  create(usuario: UsuarioAdministrador): Observable<any> {
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
   * metodo para eliminar un usuario administrador
   * @param usuario Usuario a eliminar
   */  
  delete(usuario): Observable<UsuarioAdministrador> {
    return this.http.delete<UsuarioAdministrador>(`${this.urlEndPoint}${usuario.idUsuario}`)
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
   * metodo para editar un usuario administrador
   * @param usuario Usuario a editar
   */  
  update(usuario: UsuarioAdministrador): Observable<any> {
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
   * metodo para recuperar un usuario administrador concreto
   * @param id Id del usuario
   */
  getUsuario(id): Observable<any> {
    return this.http.get<UsuarioAdministrador>(`${this.urlEndPoint}${id}`).pipe(
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
   * @param cenad Cenad del que se quiere el administrador
   */
  getUsuarioAdministrador(cenad: Cenad): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${cenad.idCenad}/usuarioAdministrador/`)
    .pipe(
      catchError((e) => {
        if (e.status === 404) {
          console.error('Este CENAD/CMT aún no tiene Usuario Administrador');
          cenad.tieneAdmin = false;
        }
        else cenad.tieneAdmin = true;
        return throwError(e);
      })
    );
  }

  /**
   * metodo para recuperar el cenad de un administrador
   * @param usuarioAdministrador Administrador del que se quiere el Cenad
   */
  getCenad(usuarioAdministrador: UsuarioAdministrador): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${usuarioAdministrador.idUsuario}/cenad/`)
      .pipe(
        catchError((e) => {
          if (e.status === 404) {
            console.error('');
          }
          return throwError(e);
        })
      );
  }

  /**
   * metodo que recupera de la BD todos los cenads
   */
  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/?page=0&size=1000`);
  }

  /**
   * metodo que recupera de la BD todos los cenads sin administrador
   */ 
  getCenadsSinAdmin(): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/sinAdmin/?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de cenads
   * @param respuestaApi [ ] de Cenad API
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
    cenad.email = cenadApi.email;
    cenad.url = cenadApi._links.self.href;
    cenad.idCenad = cenad.getId(cenad.url);
    this.getUsuarioAdministrador(cenad);

    return cenad;
  }
}