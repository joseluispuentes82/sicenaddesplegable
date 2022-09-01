import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
/**
 * este servicio me permite tener un archivo de properties donde poder modificar variables sin necesidad de volver a construir...
 */
export class AppConfigService {
  /**
   * variable del servicio
   */
  private appConfig: any;

  /**
   *
   * @param http Para usar los metodos HTTP
   */
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns Metodo que carga en el servicio los valores del archivo `properties`
   */
  loadAppConfig() {
    return this.http
      .get("/assets/properties.json")
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      });
  }

  /**
   * @returns Devuelve la variable sizeMaxEscudo
   */
  get sizeMaxEscudo() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.sizeMaxEscudo;
  }

  /**
   * @returns Devuelve la variable sizeMaxDocRecurso
   */
  get sizeMaxDocRecurso() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.sizeMaxDocRecurso;
  }

  /**
   * @returns Devuelve la variable sizeMaxDocSolicitud
   */
  get sizeMaxDocSolicitud() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.sizeMaxDocSolicitud;
  }

  /**
   * @returns Devuelve la variable tiempoMaximoLocalStorage
   */
  get tiempoMaximoLocalStorage() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.tiempoMaximoLocalStorage;
  }

  /**
   * @returns Devuelve la variable tiposTiro
   */
  get tiposTiro() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.tiposTiro;
  }

  /**
   * @returns Devuelve la variable hostSicenad
   */
  get hostSicenad() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.hostSicenad;
  }

  /**
   * @returns Devuelve la variable categoriaFicheroCartografia
   */
  get categoriaFicheroCartografia() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.categoriaFicheroCartografia;
  }

  /**
   * @returns Devuelve la variable sizeMaxCartografia
   */
  get sizeMaxCartografia() {
    if (!this.appConfig) {
      throw Error("No se ha cargado el archivo de configuración!");
    }

    return this.appConfig.sizeMaxCartografia;
  }
}
