import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faDownload, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FicheroImpl } from 'src/app/recursos/models/fichero-impl';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { SolicitudRecursoService } from '../../service/solicitud-recurso.service';

@Component({
  selector: 'app-fichero-solicitud',
  templateUrl: './fichero-solicitud.component.html',
  styleUrls: ['./fichero-solicitud.component.css']
})
export class FicheroSolicitudComponent implements OnInit {
  /**
   * variable que trae el fichero del otro componente
   */
  @Input() fichero: FicheroImpl;
  /**
   * si el fichero pertenece a una Unidad
   */
  @Input() isUnidad: boolean;
  /**
   * variable que emite un evento al otro componente para eliminar el fichero
   */
  @Output() ficheroEliminar = new EventEmitter<FicheroImpl>();
  /**
   * variable que emite un evento al otro componente para editar el fichero
   */
  @Output() ficheroSeleccionado = new EventEmitter<FicheroImpl>();
  /**
   * variable para construir la url de descarga del archivo del fichero
   */
  pathRelativo: string = '';
  /**
   * icono Fontaweson "eliminar"
   */
  faTrashAlt = faTrashAlt;
  /**
  * icono Fontaweson "editar"
  */
  faEdit = faEdit;
  /**
  * icono Fontaweson "descargar"
  */
  faDownload = faDownload;
  /**
   * variable del texto a mostrar para recortarlo (nombre)
   */
  nombreMostrado: string = '';
  /**
   * variable del texto a mostrar para recortarlo (descripcion)
   */
  descripcionMostrada: string = '';
  /**
   * si un Usuario es Normal
   */
  isUsuarioNormal: boolean = false;
  /**
   * si un usuario es Gestor
   */
  isGestor: boolean = false;
  /**
   * si un usuario se ha loggeado
   */
  isAutenticado: boolean = false;
  /**
   * id del Cenad
   */
  idCenad: string = "";
  /**
   * si puede editar
   */
  isEditar: boolean = false;

  /**
   * 
   * @param recursoService contiene todos los metodos del objeto Recurso
   * @param appConfigService contiene todos los metodos expuestos a toda la aplicacion
   * @param solicitudService contiene todos los metodos del objeto SolicitudRecurso
   */
  constructor(private recursoService: RecursoService,
    private appConfigService: AppConfigService, private solicitudService: SolicitudRecursoService) { }

  ngOnInit() {
    /**
     * obtiene del session storage el id del cenad
     */
    this.idCenad = sessionStorage.idCenad;
    /**
    * método que comprueba el rol del usuario logeado en el sistema
    */
    this.comprobarUser();
    /**
    * metodo que obtiene los datos inciales del fichero
    */
    this.datosInicialesFichero();
  }

  /**
   * método que comprueba el rol del usuario logeado en el sistema
   */
  comprobarUser(): void {
    if (sessionStorage.isLogged == undefined) {
      this.isAutenticado = false;
    } else {
      sessionStorage.isLogged.toString() == "true" ? this.isAutenticado = true : this.isAutenticado = false;
    }
    if (this.isAutenticado) {
    } if (sessionStorage.isGestor == "true" && this.idCenad == sessionStorage.idCenad) {
      this.isGestor = true;
    } else if (sessionStorage.isNormal == "true") {
      this.isUsuarioNormal = true;
    }
  }

  /**
   * metodo que obtiene los datos inciales del fichero
   */
  datosInicialesFichero(): void {
    //asigna al campo recurso del fichero el valor del recurso
    if (this.isUnidad === false) {
      this.recursoService.getSolicitudDeFicheroDeCenad(this.fichero.idFichero).subscribe((response) => this.fichero.solicitudRecursoCenad = this.solicitudService.mapearSolicitud(response));
    }
    if (this.isUnidad === true) {
      this.recursoService.getSolicitudDeFicheroDeUnidad(this.fichero.idFichero).subscribe((response) => this.fichero.solicitudRecursoUnidad = this.solicitudService.mapearSolicitud(response));
    }
    this.isEditar = (!this.isUnidad && this.isGestor) || (this.isUnidad && this.isUsuarioNormal);

    //le asigna al campo categoria fichero del fichero la categoria de fichero del mismo
    this.recursoService.getCategoriaFichero(this.fichero.idFichero).subscribe((response) => this.fichero.categoriaFichero = this.recursoService.mapearCategoriaFichero(response));
    setTimeout(() => {
      //construye el path relativo para la url de descarga del archivo
      if (this.fichero.solicitudRecursoCenad) {
        this.pathRelativo = this.appConfigService.hostSicenad ? `${this.appConfigService.hostSicenad}files/docSolicitudes/${this.fichero.solicitudRecursoCenad.idSolicitud}/` : `${environment.hostSicenad}files/docSolicitudes/${this.fichero.solicitudRecursoCenad.idSolicitud}/`;
      }
      if (this.fichero.solicitudRecursoUnidad) {
        this.pathRelativo = this.appConfigService.hostSicenad ? `${this.appConfigService.hostSicenad}files/docSolicitudes/${this.fichero.solicitudRecursoUnidad.idSolicitud}/` : `${environment.hostSicenad}files/docSolicitudes/${this.fichero.solicitudRecursoUnidad.idSolicitud}/`;
      }
    }, 3000);
    this.nombreMostrado = this.recortarTexto(this.fichero.nombre, 45);
    this.descripcionMostrada = this.recortarTexto(this.fichero.descripcion, 50);
  }

  /**
   * metodo que emite el evento para eliminar el fichero (y elimina el archivo)
   * @param fichero a eliminar
   */
  eliminar(fichero: FicheroImpl): void {
    //elimina el archivo al que se refiere el fichero
    if (this.isGestor) {
      this.recursoService.deleteArchivo(this.fichero.nombreArchivo, this.fichero.solicitudRecursoCenad.idSolicitud).subscribe();
    }
    if (this.isUsuarioNormal) {
      this.recursoService.deleteArchivo(this.fichero.nombreArchivo, this.fichero.solicitudRecursoUnidad.idSolicitud).subscribe();
    }

    this.ficheroEliminar.emit(fichero);
  }

  /**
   * metodo que construye la url de descarga del archivo
   * @param nombreArchivo string que contiene el nombre del archivo
   * @returns la ruta
   */
  pathArchivo(nombreArchivo: string): string {
    const pathImg: string = `${this.pathRelativo}${nombreArchivo}`;
    return pathImg;
  }

  /**
   * metodo para recortar el texto a mostrar
   * @param texto string que contiene el texto a recortar
   * @param numeroCaracteres number del numero de caracteres a borrar
   * @returns el texto recortado
   */
  recortarTexto(texto: string, numeroCaracteres: number): string {
    let textoFinal: string = '';
    textoFinal = (texto.length > numeroCaracteres) ? texto.slice(0, numeroCaracteres) : texto;
    return textoFinal;
  }
}