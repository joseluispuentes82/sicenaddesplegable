import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Arma } from 'src/app/armas/models/arma';
import { ArmaImpl } from 'src/app/armas/models/arma-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { SolicitudArma } from '../../models/solicitud-arma';
import { SolicitudRecursoService } from '../../service/solicitud-recurso.service';

@Component({
  selector: 'app-arma',
  templateUrl: './arma.component.html',
  styleUrls: ['./arma.component.css']
})
export class ArmaComponent implements OnInit {
  /**
   * icono FontAwesome
   */
  faVista = faGlasses;
  /**
   * para habilitar la edición de los campos del formulario
   */
  @Input() isConsulta: boolean;
  /**
   * instancia objeto SolicitudArma que recibe del componente SolicitudRecursoForm
   */
  @Input() solicitudArma: SolicitudArma;
  /**
   * id del CENAD/CMT
   */
  @Input() idCenad: string;
  /**
   * nombre del recurso
   */
  @Input() nombreRecurso: string;
  /**
   * endpoint del recurso seleccionado (no se ha creado todavía la solicitud
   */
  @Input() uRlRecursoSeleccionado: string;
  /**
   * variable que emite la solicitudArma seleccionada
   */
  @Output() solicitudArmaSeleccionada = new EventEmitter<SolicitudArma>();
  /**
   * variable que emite el arma seleccionada
   */
  @Output() armaSeleccionada = new EventEmitter<Arma>();
  /**
   * instancia objeto Arma
   */
  arma: Arma = new ArmaImpl();
  /**
   * para controlar si encuentra el objeto arma que tiene una solicitudArma
   */
  test: boolean = false;
  /**
   * array[] de Recursos del CENAD/CMT
   */
  recursosDeCenad: Recurso[] = [];
  /**
   * codigo de la zona de caida
   */
  codigoZona: string = "";


  /**
   * 
   * @param solicitudService contiene todos los metodos del modulo solicitudRecurso
   */
  constructor(private solicitudService: SolicitudRecursoService) {
  }

  ngOnInit() {
    this.test = false;
    /**
    * método que obtiene del local storage todos los Recursos del Cenad
    */
    this.getRecursosDeCenad();
  }

  /**
   * método que obtiene del local storage todos los Recursos del Cenad
   */
  getRecursosDeCenad(): void {
    this.recursosDeCenad = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
  }

  /**
   * metodo que recibe como parametro elobjeto solicitudarma y arma, y emite estos objetos
   * @param solicitudArma objeto solicitudArma
   * @param arma objeto arma
   */
  emitirDatos(solicitudArma: SolicitudArma, arma: Arma): void {
    this.solicitudArmaSeleccionada.emit(solicitudArma);
    this.armaSeleccionada.emit(arma);
  }


  /**
   * metodo que en funcion del tipo de arma devuelve la url para acceder al sistema webcenad y obtenga la grafica del arma
   * @returns la url de acceso al sistema webcenad
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
   * metodo que devuele la url para acceder al servicio de webcenad
   * y en funcion del nombre del recurso, calcula el cod de zona
   * @returns el string de la url
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
