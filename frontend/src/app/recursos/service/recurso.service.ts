import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Categoria } from "src/app/categorias/models/categoria";
import { CategoriaImpl } from "src/app/categorias/models/categoria-impl";
import { CategoriaFichero } from "src/app/categoriasFichero/models/categoriaFichero";
import { CategoriaFicheroImpl } from "src/app/categoriasFichero/models/categoriaFichero-impl";
import { AppConfigService } from "src/app/services/app-config.service";
import { TipoFormulario } from "src/app/tiposFormulario/models/tipoFormulario";
import { TipoFormularioImpl } from "src/app/tiposFormulario/models/tipoFormulario-impl";
import { UsuarioGestor } from "src/app/usuarios/models/usuarioGestor";
import { UsuarioGestorImpl } from "src/app/usuarios/models/usuarioGestor-impl";
import { environment } from "src/environments/environment";
import { Fichero } from "../models/fichero";
import { FicheroImpl } from "../models/fichero-impl";
import { Recurso } from "../models/recurso";
import { RecursoImpl } from "../models/recurso-impl";

@Injectable({
  providedIn: "root",
})
export class RecursoService {
  /**
   * endpoint raiz de la API
   */
  private host: string = environment.hostSicenad;
  /**
   * endpoint especifico de los recursos
   */
  private urlEndPoint: string = `${this.host}recursos/`;
  /**
   * endpoint del almacenamiento de archivos
   */
  private urlFiles = `${this.host}files/`;

  /**
   *
   * @param http Para usar los metodos propios HTTP
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {
    this.host = appConfigService.hostSicenad
      ? appConfigService.hostSicenad
      : environment.hostSicenad;
    this.urlEndPoint = `${this.host}recursos/`;
    this.urlFiles = `${this.host}files/`;
  }

  /**
   * metodo que obtiene los ficheros del Cenad de una solicitud
   * @param idSolicitud Id de la solicitud
   */
  getFicherosSolicitudCenad(idSolicitud: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}solicitudes/${idSolicitud}/documentacionCenad/?page=0&size=1000`
    );
  }

  /**
   * metodo que obtiene los ficheros de la unidad de una solicitud
   * @param idSolicitud Id de la solicitud
   */ getFicherosSolicitudUnidad(idSolicitud: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}solicitudes/${idSolicitud}/documentacionUnidad/?page=0&size=1000`
    );
  }

  /**
   * metodo para obtener el recurso de un fichero
   * @param idFichero Id del fichero
   */
  getSolicitudDeFicheroDeCenad(idFichero: String) {
    return this.http.get<any>(
      `${this.host}ficheros/${idFichero}/solicitudRecursoCenad/?page=0&size=1000`
    );
  }

  /**
   * metodo para obtener el recurso de un fichero
   * @param idFichero Id del fichero
   */
  getSolicitudDeFicheroDeUnidad(idFichero: String) {
    return this.http.get<any>(
      `${this.host}ficheros/${idFichero}/solicitudRecursoUnidad/?page=0&size=1000`
    );
  }

  /**
   * metodo para subir un archivo a la subcarpeta de una solicitud
   * @param file Archivo a subir
   * @param idSolicitud Id de la solicitud
   */
  uploadSolicitud(file: File, idSolicitud: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${this.urlFiles}subirDocSolicitud/${idSolicitud}`,
      formData,
      {
        reportProgress: true,
        responseType: "json",
      }
    );
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
   * metodo para subir un archivo a la subcarpeta de un recurso
   * @param file Archivo a subir
   * @param idSolicitud Id del recurso
   */
  upload(file: File, idRecurso: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${this.urlFiles}subirDocRecurso/${idRecurso}`,
      formData,
      {
        reportProgress: true,
        responseType: "json",
      }
    );
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
   * metodo para borrar un archivo de la subcarpeta de una solicitud
   * @param fileName Nombre del archivo
   * @param idSolicitud Id de la solicitud
   */
  deleteArchivoSolicitud(
    fileName: string,
    idSolicitud: string
  ): Observable<any> {
    return this.http
      .get(`${this.urlFiles}borrarDocSolicitud/${idSolicitud}/${fileName}`)
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
   * metodo para borrar un archivo de la subcarpeta de un recurso
   * @param fileName Nombre del archivo
   * @param idRecurso Id del recurso
   */
  deleteArchivo(fileName: string, idRecurso: string): Observable<any> {
    return this.http
      .get(`${this.urlFiles}borrarDocRecurso/${idRecurso}/${fileName}`)
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
   * metodo para recuperar de la BD todos los recursos
   */
  getRecursos(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  /**
   * metodo para recuperar de la BD los recursos de un cenad
   * @param idCenad Id del Cenad
   */
  getRecursosDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/recursos/?page=0&size=1000`
    );
  }

  /**
   * metodo para recuperar de la BD los recursos de una categoria
   * @param categoria Categoria de la que se quieren sacar los recursos
   */
  getRecursosDeCategoria(categoria: Categoria) {
    return this.http.get<any>(
      `${this.host}categorias/${categoria.idCategoria}/recursos/?page=0&size=1000`
    );
  }

  /**
   * metodo para recuperar de la BD los recursos pertenecientes a todas las subcategorias de una categoria
   * @param categoria Categoria de la que sacar los recursos recursivamente
   */
  getRecursosDeSubcategorias(categoria: Categoria) {
    return this.http.get<any>(
      `${this.host}categorias/${categoria.idCategoria}/recursosDeSubcategorias/?page=0&size=1000`
    );
  }

  /**
   * metodo para extraer el [ ] de recursos
   * @param respuestaApi [ ] de Recurso API
   * @returns Devuelve un [ ] de Recurso
   */
  extraerRecursos(respuestaApi: any): Recurso[] {
    const recursos: Recurso[] = [];
    if (respuestaApi._embedded) {
      respuestaApi._embedded.recursos.forEach((r) =>
        recursos.push(this.mapearRecurso(r))
      );
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
    recurso.conDatosEspecificosSolicitud =
      recursoApi.conDatosEspecificosSolicitud;
    recurso.datosEspecificosSolicitud = recursoApi.datosEspecificosSolicitud;
    recurso.url = recursoApi._links.self.href;
    recurso.idRecurso = recurso.getId(recurso.url);
    this.getCategoria(recurso.idRecurso).subscribe(
      (response) => (recurso.categoria = this.mapearCategoria(response))
    );
    return recurso;
  }

  /**
   * metodo para crear un recurso
   * @param recurso Recurso a crear
   */
  create(recurso: Recurso): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, recurso).pipe(
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
   * metodo para crear un fichero
   * @param fichero Fichero a crear
   */
  createFichero(fichero: Fichero): Observable<any> {
    return this.http.post(`${this.host}ficheros/`, fichero).pipe(
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
   * metodo para eliminar un recurso
   * @param recurso Recurso a eliminar
   */
  delete(recurso): Observable<Recurso> {
    return this.http
      .delete<Recurso>(`${this.urlEndPoint}${recurso.idRecurso}`)
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
   * metodo para editar un recurso
   * @param recurso Recurso a editar
   */
  update(recurso: Recurso): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}${recurso.idRecurso}`, recurso)
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
   * metodo para obtener el gestor de un recurso
   * @param recurso Recurso del que obtener el gestor
   */
  getUsuarioGestor(recurso: Recurso): Observable<any> {
    return this.http
      .get<any>(`${this.urlEndPoint}${recurso.idRecurso}/usuarioGestor`)
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
   * metodo para obtener el gestor de un recurso
   * @param idRecurso Id del recurso del que sacar el gestor
   */
  getUsuarioGestorDeIdRecurso(idRecurso: string): Observable<any> {
    return this.http
      .get<any>(`${this.urlEndPoint}${idRecurso}/usuarioGestor`)
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
   * metodo para obtener la categoria de un recurso
   * @param idRecurso Id del recurso del que sacar la categoria
   */
  getCategoria(idRecurso: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${idRecurso}/categoria`).pipe(
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
   * metodo para obtener el tipo de formulario de un recurso
   * @param recurso Recurso del que se saca el tipo de formulario
   */
  getTipoFormulario(recurso: Recurso): Observable<any> {
    return this.http
      .get<any>(`${this.urlEndPoint}${recurso.idRecurso}/tipoFormulario`)
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
   * metodo para obetener todos los tipos de formulario
   */
  getTiposFormulario(): Observable<any> {
    return this.http.get<any>(`${this.host}tipos_formulario/?page=0&size=1000`);
  }

  /**
   * metodos para extraer el [ ] de tipos de formulario
   * @param respuestaApi [ ] de tipos de formulario API
   * @returns Devuelve un [ ] de TipoFormulario
   */
  extraerTiposFormulario(respuestaApi: any): TipoFormulario[] {
    const tiposFormulario: TipoFormulario[] = [];
    respuestaApi._embedded.tipos_formulario.forEach((r) =>
      tiposFormulario.push(this.mapearTipoFormulario(r))
    );
    return tiposFormulario;
  }

  /**
   * metodo para mapear un tipo de formulario segun la interfaz
   * @param tipoFormularioApi Tipo de formulario API
   * @returns Devuelve un TipoFormularioImpl
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
   * metodo para obtener las categorias de un cenad
   * @param idCenad Id del Cenad
   */
  getCategoriasDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/categorias/?page=0&size=1000`
    );
  }

  /**
   * metodo para obtener las categorias padre de un cenad
   * @param idCenad Id del Cenad
   */
  getCategoriasPadreDeCenad(idCenad: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/categoriasPadre/?page=0&size=1000`
    );
  }

  /**
   * metodo para obetenr la categoria padre de una categoria
   * @param categoria Categoria de la que sacar la categoria padre
   */
  getCategoriaPadre(categoria: Categoria): Observable<any> {
    return this.http.get<any>(
      `${this.host}categorias/${categoria.idCategoria}/categoriaPadre`
    );
  }

  /**
   * metodo para obtener las subcategorias de una categoria
   * @param categoria Categoria de la que sacar subcategorias
   */
  getSubcategorias(categoria: Categoria): Observable<any> {
    return this.http.get<any>(
      `${this.host}categorias/${categoria.idCategoria}/subcategorias/`
    );
  }

  /**
   * metodo para obetenr recursivamente todas las subcategorias anidadas a una categoria
   * @param categoria Categoria de la que sacar las subcategorias anidadas
   */
  getSubcategoriasAnidadas(categoria: Categoria): Observable<any> {
    return this.http.get<any>(
      `${this.host}categorias/${categoria.idCategoria}/subcategoriasAnidadas/`
    );
  }

  /**
   * metodo para extraer el [ ] de categorias
   * @param respuestaApi [ ] de categoria API
   * @returns Devuelve un [ ] de Categoria
   */
  extraerCategorias(respuestaApi: any): Categoria[] {
    const categorias: Categoria[] = [];
    respuestaApi._embedded.categorias.forEach((c) =>
      categorias.push(this.mapearCategoria(c))
    );
    return categorias;
  }

  /**
   * metodo para mapear una categoria segun la interfaz
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
   * metodo para obtener los gestores de un cenad
   * @param idCenad Id del Cenad
   */
  getUsuariosGestor(idCenad: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}cenads/${idCenad}/usuariosGestores/?page=0&size=1000`
    );
  }

  /**
   * metodo para extraer el [ ] de usuarios
   * @param respuestaApi [ ] de Usuarios API
   * @returns Devuelve un [ ] de UsuarioGestor
   */
  extraerUsuarios(respuestaApi: any): UsuarioGestor[] {
    const usuarios: UsuarioGestor[] = [];
    respuestaApi._embedded.usuarios_gestor.forEach((u) =>
      usuarios.push(this.mapearUsuario(u))
    );
    return usuarios;
  }

  /**
   * metodo para mapear un usuario segun la interfaz
   * @param usuarioApi Usuario API
   * @returns Devuelve un UsuarioGestorImpl
   */
  mapearUsuario(usuarioApi: any): UsuarioGestorImpl {
    const usuario = new UsuarioGestorImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.password = usuarioApi.password;
    usuario.tfno = usuarioApi.tfno;
    usuario.email = usuarioApi.email;
    usuario.emailAdmitido = usuarioApi.emailAdmitido;
    usuario.descripcion = usuarioApi.descripcion;
    usuario.url = usuarioApi._links.self.href;
    usuario.idUsuario = usuario.getId(usuario.url);
    usuario.tipo = "gestor";
    return usuario;
  }

  /**
   * metodo para obtener un recurso por su id
   * @param id Id del recurso
   */
  getRecurso(id): Observable<any> {
    return this.http.get<Recurso>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * metodo para obetener los ficheros de un recurso
   * @param idRecurso Id del recurso
   */
  getFicheros(idRecurso: string): Observable<any> {
    return this.http.get<any>(
      `${this.urlEndPoint}${idRecurso}/ficheros/?page=0&size=1000`
    );
  }

  /**
   * metodo para extraer el [ ] de ficheros
   * @param respuestaApi [ ] de ficheros API
   * @returns Devuelve el [ ] de Fichero
   */
  extraerFicheros(respuestaApi: any): Fichero[] {
    const ficheros: Fichero[] = [];
    respuestaApi._embedded.ficheros.forEach((f) =>
      ficheros.push(this.mapearFichero(f))
    );
    return ficheros;
  }

  /**
   * metodo para mapear un fichero segun la interfaz
   * @param ficheroApi Fichero API
   * @returns Devuelve un FicheroImpl
   */
  mapearFichero(ficheroApi: any): FicheroImpl {
    const fichero = new FicheroImpl();
    fichero.nombre = ficheroApi.nombre;
    fichero.nombreArchivo = ficheroApi.nombreArchivo;
    fichero.imagen = ficheroApi.imagen;
    fichero.descripcion = ficheroApi.descripcion;
    fichero.url = ficheroApi._links.self.href;
    fichero.idFichero = fichero.getId(fichero.url);
    this.getCategoriaFichero(fichero.idFichero).subscribe(
      (response) =>
        (fichero.categoriaFichero = this.mapearCategoriaFichero(response))
    );
    return fichero;
  }

  /**
   * metodo para borrar un fichero
   * @param fichero Fichero a eliminar
   */
  deleteFichero(fichero: Fichero): Observable<Fichero> {
    return this.http
      .delete<Fichero>(`${this.host}ficheros/${fichero.idFichero}`)
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
   * metodo para editar un fichero
   * @param fichero Fichero a editar
   */
  updateFichero(fichero: Fichero): Observable<any> {
    return this.http
      .patch<any>(`${this.host}ficheros/${fichero.idFichero}`, fichero)
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
   * metodo para obtener todas las categorias de fichero
   */
  getCategoriasFichero(): Observable<any> {
    return this.http.get<any>(
      `${this.host}categorias_fichero/?page=0&size=1000`
    );
  }

  /**
   * metodo para extraer el [ ] de categorias de fichero
   * @param respuestaApi [ ] de categorias de fichero API
   * @returns Devuelve un [ ] de CategoriaFichero
   */
  extraerCategoriasFichero(respuestaApi: any): CategoriaFichero[] {
    const categoriasFichero: CategoriaFichero[] = [];
    respuestaApi._embedded.categorias_fichero.forEach((c) =>
      categoriasFichero.push(this.mapearCategoriaFichero(c))
    );
    return categoriasFichero;
  }

  /**
   * metodo para obtener la categoria de fichero de un fichero
   * @param idFichero Id del fichero
   */
  getCategoriaFichero(idFichero: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}ficheros/${idFichero}/categoriaFichero/?page=0&size=1000`
    );
  }

  /**
   * metodo para mapear una categoria de fichero segun su interfaz
   * @param categoriaFicheroApi Categoria de fichero API
   * @returns Devuelve una CategoriaFicheroImpl
   */
  mapearCategoriaFichero(categoriaFicheroApi: any): CategoriaFicheroImpl {
    const categoriaFichero = new CategoriaFicheroImpl();
    categoriaFichero.nombre = categoriaFicheroApi.nombre;
    categoriaFichero.tipo = categoriaFicheroApi.tipo;
    categoriaFichero.descripcion = categoriaFicheroApi.descripcion;
    categoriaFichero.url = categoriaFicheroApi._links.self.href;
    categoriaFichero.idCategoriaFichero = categoriaFichero.getId(
      categoriaFichero.url
    );
    return categoriaFichero;
  }

  /**
   * metodo para obtener el recurso de un fichero
   * @param idFichero Id del fichero
   */
  getRecursoDeFichero(idFichero: String) {
    return this.http.get<any>(
      `${this.host}ficheros/${idFichero}/recurso/?page=0&size=1000`
    );
  }

  /**
   * metodo para obtener las categorias de fichero de los ficheros de un recurso
   * @param idRecurso Id del recurso
   */
  getCategoriasFicheroDeRecurso(idRecurso: String) {
    return this.http.get<any>(
      `${this.urlEndPoint}${idRecurso}/categoriasFichero/?page=0&size=1000`
    );
  }

  /**
   * metodo para recuperar de la BD los recursos de un gestor
   * @param idGestor Id del gestor
   */
  getRecursosDeGestor(idGestor: string): Observable<any> {
    return this.http.get<any>(
      `${this.host}usuarios_gestor/${idGestor}/recursos/?page=0&size=1000`
    );
  }
}
