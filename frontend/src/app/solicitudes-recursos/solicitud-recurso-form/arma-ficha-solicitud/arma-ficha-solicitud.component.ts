import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArmaImpl } from 'src/app/armas/models/arma-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { SolicitudArmaImpl } from '../../models/solicitud-arma-impl';

@Component({
  selector: 'app-arma-ficha-solicitud',
  templateUrl: './arma-ficha-solicitud.component.html',
  styleUrls: ['./arma-ficha-solicitud.component.css']
})
export class ArmaFichaSolicitudComponent implements OnInit {
  /**
   * variable que recibe el objeto solicitudArma a editar
   */
  @Input() solicitudArma: SolicitudArmaImpl;
  /**
   * variable que recibe el objeto Arma
   */
  @Input() arma: ArmaImpl;
  /**
   * para habilitar la edición de los campos del formulario
   */
  @Input() isConsulta: boolean;
  /**
   * id del CENAD/CMT
   */
  @Input() idCenad: string;
  /**
   * nombre del recurso
   */
  @Input() nombreRecurso: string;
  /**
   * endpoint del recurso seleccionado (no se ha creado todavía la solicitud)
   */
  @Input() uRlRecursoSeleccionado: string;
  /**
   * variable que emite el objeto solicitudArma a eliminar
   */
  @Output() solicitudArmaEliminar = new EventEmitter<SolicitudArmaImpl>();
  /**
   * variable que emite el objeto solicitudArma a actualizar
   */
  @Output() solicitudArmaActualizar = new EventEmitter<SolicitudArmaImpl>();
  /**
   * variable que emite el objeto arma actualizado
   */
  @Output() armaActualizada = new EventEmitter<ArmaImpl>();
  /**
   * instancia objeto Arma
   */
  armaSeleccionada: ArmaImpl;
  /**
   * id del arma seleccionada
   */
  idArmaSeleccionada: string = "";
  /**
   * endpoint del arma seleccionada
   */
  urlArmaSeleccionada: string = "";
  /**
   * tipo tiro del arma seleccionada
   */
  tipoTiroSeleccionado: string = "";
  /**
   * para controlar si encuentra el objeto arma que tiene una solicitudArma
   */
  test: boolean = false;
  /**
   * array de Armas
   */
  armas: ArmaImpl[] = [];
  /**
   * array[] de Recursos del CENAD/CMT
   */
  recursosDeCenad: Recurso[] = [];
  /**
   * codigo de la zona de caida del arma
   */
  codigoZona: string = "";

  constructor() { }

  ngOnInit(): void {
    this.armaSeleccionada = this.arma;
    this.idArmaSeleccionada = this.arma.idArma;
    this.test = false;
    /**
   * metodo que obtiene las armas del local storage
   */
    this.getArmas();
    /**
   * método que obtiene del local storage todos los Recursos del Cenad
   */
    this.getRecursosDeCenad();
  }
  /**
   * metodo que obtiene las armas del local storage
   */
  getArmas(): void {
    //obtiene todas las armas 
    this.armas = JSON.parse(localStorage.armas);
  }

  /**
   * metodo que filtra el tipo de arma en funcion del arma seleccionada
   */
  filtrarTipoTiro(): void {
    this.armas.forEach(a => {
      if (a.idArma.toString() == this.idArmaSeleccionada) {
        this.tipoTiroSeleccionado = a.tipoTiro.toString();
        this.urlArmaSeleccionada = a.url.toString();
        this.armaSeleccionada = a;
        console.log('arma seleccionada', this.armaSeleccionada);
        this.test = true;
      }
    });
  }

  /**
   * metodo que actualiza los ngModel del formulario
   */
  actualizarNgModels(): void {
    this.idArmaSeleccionada = this.arma ? this.arma.idArma : "";
    this.urlArmaSeleccionada = this.arma ? this.arma.url : "";
    this.filtrarTipoTiro();
  }

  /**
   * método que obtiene del local storage todos los Recursos del Cenad
   */
  getRecursosDeCenad(): void {
    this.recursosDeCenad = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
  }

  /**
   * metodo que emite el objeto solicitudArma a eliminar
   */
  eliminar(): void {
    this.solicitudArmaEliminar.emit(this.solicitudArma);
  }

  /**
   * metodo que emite el arma y la solicitud de arma para guardar
   */
  guardar(): void {
    this.armaActualizada.emit(this.armaSeleccionada);
    this.solicitudArmaActualizar.emit(this.solicitudArma);
    console.log(this.armaSeleccionada);
  }

  /**
   * metodo que genera la url para acceder al servicio webcenad para obtener la grafica del arma
   * @returns la url
   */
  verGrafica(): string {

    switch (this.arma.tipoTiro) {
      case "Tiro indirecto":
        let url: string = this.tiroIndirecto();
        return url;

        break;
      case "Tiro directo":
        return `http://webcenad.mdef.es/SIP3.0/DrawGraficaTrayectoria.aspx?width=1024&tipo=2&arma=${this.arma.nombre}&coAsent=${this.solicitudArma.coordXAsentamiento},${this.solicitudArma.coordYAsentamiento}&coPPC=${this.solicitudArma.coordXPuntoCaida},${this.solicitudArma.coordYPuntoCaida}&proyCMC=${this.solicitudArma.alcanceMax}`;

        break;
      default: // "Tiro antiaereo":
        return `http://webcenad.mdef.es/SIP3.0/DrawGraficaTrayectoria.aspx?width=1024&tipo=3&arma=${this.arma.nombre}&coAsent=${this.solicitudArma.coordXAsentamiento},${this.solicitudArma.coordYAsentamiento}&coPPC=${this.solicitudArma.coordXPuntoCaida},${this.solicitudArma.coordYPuntoCaida}&alMax=${this.solicitudArma.alcanceMax}&zonaSeg=${this.solicitudArma.zonaSegAngulo}`;
        break;
    }
  }

  /**
   * metodo que calcula la url para los armas con tipo de tiro indirecto
   * @returns la url
   */
  tiroIndirecto(): string {
    if (!this.nombreRecurso) {
      this.recursosDeCenad.forEach(r => {
        r.url.toString() == this.uRlRecursoSeleccionado ? this.nombreRecurso = r.nombre.toString() : "";
      });
      this.buscarCodZona();
    }
    return `http://webcenad.mdef.es/SIP3.0/DrawGraficaTrayectoria.aspx?width=1024&tipo=1&arma=${this.arma.nombre}&coAsent=${this.solicitudArma.coordXAsentamiento},${this.solicitudArma.coordYAsentamiento}&coPPC=${this.solicitudArma.coordXPuntoCaida},${this.solicitudArma.coordYPuntoCaida}&cdZona=${this.codigoZona}&alMCP=${this.solicitudArma.alcanceMax}&alMCA=${this.solicitudArma.alcanceMax}&alMCM=${this.solicitudArma.alcanceMax}`;
  }

  /**
   * metodo que en función del nombre de la zona de caida asigna un codigo de zona
   */
  buscarCodZona(): void {
    console.log('nombreRecurso', this.nombreRecurso);
    switch (this.nombreRecurso) {
      case "PUIG AMARILLO":
        this.codigoZona = "110";
        break;
      case "LENTISCAR":
        this.codigoZona = "120";
        break;
      case "VALDEHACER":
        this.codigoZona = "130";
        break;
      case "F-23":
        this.codigoZona = "150";
        break;
      default: this.codigoZona = "";
        break;
    }
  }

}
