import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { CategoriaFichero } from '../models/categoriaFichero';
import { CategoriaFicheroImpl } from '../models/categoriaFichero-impl';

@Injectable({
  providedIn: 'root'
})
export class CategoriaFicheroService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de las categorias de fichero
   */
  private urlEndPoint: string = `${this.host}categorias_fichero/`;

  /**
   * 
   * @param http Para usar los metodos de HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(
    private http: HttpClient, private appConfigService: AppConfigService) {
    this.host = appConfigService.hostSicenad ? appConfigService.hostSicenad : environment.hostSicenad;
    this.urlEndPoint = `${this.host}categorias_fichero/`;
  }

  /**
   * metodo que recupera de la BD todas las categorias de fichero
   */
  getCategoriasFichero(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * metodo que extrae el [ ] de categorias de fichero 
   * @param respuestaApi [ ] de categorias de fichero API
   * @returns Devuelve un [ ] de CategoriaFichero
   */
  extraerCategoriasFichero(respuestaApi: any): CategoriaFichero[] {
    const categoriasFichero: CategoriaFichero[] = [];
    respuestaApi._embedded.categorias_fichero.forEach(c =>
      categoriasFichero.push(this.mapearCategoriaFichero(c)));
    return categoriasFichero;
  }

  /**
   * metodo que mapea la categoria de fichero segun la interfaz
   * @param categoriaFicheroApi Categoria de fichero API
   * @returns Devuelve una CategoriaFicheroImpl
   */
  mapearCategoriaFichero(categoriaFicheroApi: any): CategoriaFicheroImpl {
    const categoriaFichero = new CategoriaFicheroImpl();
    categoriaFichero.nombre = categoriaFicheroApi.nombre;
    categoriaFichero.descripcion = categoriaFicheroApi.descripcion;
    categoriaFichero.tipo = categoriaFicheroApi.tipo;
    categoriaFichero.url = categoriaFicheroApi._links.self.href;
    categoriaFichero.idCategoriaFichero = categoriaFichero.getId(categoriaFichero.url);
    return categoriaFichero;
  }

  /**
   * metodo que crea en nuestra BD una nueva categoria de fichero 
   * @param categoriaFichero Categoria de fichero a crear
   */
  create(categoriaFichero: CategoriaFichero): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, categoriaFichero).pipe(
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
   * metodo que elimina en nuestra BD una nueva categoria de fichero 
   * @param categoriaFichero Categoria de fichero a eliminar
   */  
  delete(categoriaFichero): Observable<CategoriaFichero> {
    return this.http.delete<CategoriaFichero>(`${this.urlEndPoint}${categoriaFichero.idCategoriaFichero}`)
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
   * metodo que edita en nuestra BD una nueva categoria de fichero 
   * @param categoriaFichero Categoria de fichero a editar
   */
  update(categoriaFichero: CategoriaFichero): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${categoriaFichero.idCategoriaFichero}`, categoriaFichero)
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
}
