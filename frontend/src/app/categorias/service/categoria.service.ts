import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { CategoriaImpl } from '../models/categoria-impl';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de las categorias
   */
  private urlEndPoint: string = `${this.host}categorias/`;

  /**
   * 
   * @param http Para usar los metodos HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService) { 
      this.host = this.appConfigService.hostSicenad ? this.appConfigService.hostSicenad : environment.hostSicenad;
      this.urlEndPoint =  `${this.host}categorias/`;
    }


  /**
   * metodo que recupera de la BD las categorias de un CENAD/CMT
   * @param idCenad Id del Cenad
   */
  getCategoriasDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categorias/?page=0&size=1000`);
  }

  /**
   * metodo para obtener las categorias padre de un cenad
   * @param idCenad Id del Cenad
   */
  getCategoriasPadreDeCenad(idCenad:string): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/${idCenad}/categoriasPadre/?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de categorias
   * @param respuestaApi [ ] de Categorias API
   * @returns Devuelve un [ ] de Categoria
   */
  extraerCategorias(respuestaApi: any): Categoria[] {
    const categorias: Categoria[] = [];
    if(respuestaApi._embedded) {
      respuestaApi._embedded.categorias.forEach(c => 
        categorias.push(this.mapearCategoria(c)));
    }
    return categorias;
  }

  /**
   * metodo que mapea cada categoria segun la interfaz
   * @param categoriaApi Categoria API
   * @returns Devuelve una CategoriaImpl
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
   * metodo que crea en nuestra BD una nueva categoria
   * @param categoria Categoria a crear
   */
  create(categoria: Categoria): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, categoria).pipe(
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
   * metodo que borra de nuestra BD una categoria
   * @param categoria Categoria a eliminar
   */
  delete(categoria): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.urlEndPoint}${categoria.idCategoria}`)
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
   * metodo que actualiza en nuestra BD una categoria
   * @param categoria Categoria a editar
   */
  update(categoria: Categoria): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${categoria.idCategoria}`, categoria)
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
   * metodo que recupera de la BD la categoria padre de una categoria
   * @param categoria Categoria de la que se quiere obtener la categoria padre
   */
  getCategoriaPadre(categoria: Categoria): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${categoria.idCategoria}/categoriaPadre`)
    .pipe(
      catchError((e) => {
        if (e.status === 404) {
          console.error('Esta categoría no tiene categoría Padre');
        }
        return throwError(e);
      })
    );
  }

  /**
   * metodo que recupera de la BD las subcategorias de una categoria
   * @param categoria Categoria de la que se quieren obtener las subcategorias
   */
  getSubcategorias(categoria:Categoria): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${categoria.idCategoria}/subcategorias/`);
  }

  /**
   * metodo que recupera de la BD todos los CENADS
   */
  getCenads(): Observable<any> {
    return this.http.get<any>(`${this.host}cenads/?page=0&size=1000`);
  }

  //metodo que recupera de la BD un CENAD (por su id)
  getCenad(id): Observable<any> {
    return this.http.get<Cenad>(`${this.host}cenads/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * metodo que recupera de la BD el CENAD de una categoria
   * @param categoria Categoria de la que se quiere obtener el Cenad
   */
  getCenadDeCategoria(categoria: Categoria): Observable<any> {
    return this.http.get<Cenad>(`${this.urlEndPoint}${categoria.idCategoria}/cenad`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
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
   * metodo que mapea un CENAD segun la interfaz
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
    return cenad;
  }

  /**
   * metodo que recupera de la BD los recursos de una categoria
   * @param categoria Categoria de la que se quieren obtener los recursos
   */
  getRecursosDeCategoria(categoria: Categoria): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${categoria.idCategoria}/recursos/?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de recursos
   * @param respuestaApi [ ] de Recurso API
   * @returns Devuelve un [ ] de Recurso
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
}