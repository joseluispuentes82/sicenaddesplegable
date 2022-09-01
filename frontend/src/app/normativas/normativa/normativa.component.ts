import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Fichero } from 'src/app/recursos/models/fichero';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { NormativaService } from '../service/normativa.service';

@Component({
  selector: 'app-normativa',
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.css']
})
export class NormativaComponent implements OnInit {
  /**
   * variable para recuperar el id del CENAD/CMT
   */
  idCenad: string = "";
  /**
   * variable que trae los datos correspondientes a la normativa del otro componente
   */
  @Input() normativa: Fichero;
  /**
   * variable que comunica al otro componente el evento para ver sus datos y editarlos
   */
  @Output() normativaSeleccionada = new EventEmitter<Fichero>();
  /**
   * variable para construir la url de descarga del archivo del fichero
   */
  pathRelativo: string = `${environment.hostSicenad}files/normativas/${this.idCenad}/`;
  /**
   * variable para icono "editar"
   */
  faEdit = faEdit;
  /**
   * variable para icono "descargar"
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
   * variable boolean que dice si eres administrador de ese CENAD y por tanto puedes editarla
   */
  isAdminCenad: boolean = true;

  /**
   * 
   * @param normativaService Para usar los metodos propios de Normativa
   * @param activateRoute Para capturar el id de la barra de navegacion
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(private normativaService: NormativaService,
    private activateRoute: ActivatedRoute,
    private appConfigService: AppConfigService) { }

  /**
   * - recuperamos el id del CENAD de la barra de navegacion
   * - comprueba si estas loggeado como administrador de este cenad
   */
  ngOnInit() {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
    this.isAdminCenad = (this.idCenad === sessionStorage.idCenad && (sessionStorage.isAdmin === 'true'));
    this.pathRelativo = this.appConfigService.hostSicenad ? `${this.appConfigService.hostSicenad}files/normativas/${this.idCenad}/` : `${environment.hostSicenad}files/normativas/${this.idCenad}/`;
    this.nombreMostrado = this.recortarTexto(this.normativa.nombre, 45);
    this.descripcionMostrada = this.recortarTexto(this.normativa.descripcion, 50);
  }

  /**
   * metodo que construye la url de descarga del archivo
   * @param nombreArchivo Nombre del archivo
   * @returns Devuelve la ruta del archivo
   */
  pathArchivo(nombreArchivo: string): string {
    const pathImg: string = `${this.pathRelativo}${nombreArchivo}`;
    return pathImg;
  }

  /**
   * metodo para recortar el texto a mostrar
   * @param texto Texto a recortar
   * @param numeroCaracteres Numero de caracteres que tendrá el texto obtenido
   * @returns Devuelve el texto recortado
   */
  recortarTexto(texto: string, numeroCaracteres: number): string {
    let textoFinal: string = '';
    textoFinal = (texto.length > numeroCaracteres) ? texto.slice(0, numeroCaracteres) : texto;
    return textoFinal;
  }
}