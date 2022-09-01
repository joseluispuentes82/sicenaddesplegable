import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';

@Component({
  selector: 'app-solicitudes-recursos',
  templateUrl: './solicitudes-recursos.component.html',
  styleUrls: ['./solicitudes-recursos.component.css']
})
export class SolicitudesRecursosComponent implements OnInit {
  /**
   * icono FontAwesome 'ver'
   */
  faVista = faGlasses;
  /**
   * icono FontAwesome 'volver'
   */
  faVolver = faArrowAltCircleLeft;
  /**
   * id del Cenad
   */
  idCenad: string = "";
  /**
   * id de la solicitud
   */
  idSolicitud: string = "";
  /**
   * si un usuario esta autenticado
   */
  isAutenticado: boolean = false;
  /**
   * si un usuario es administrador
   */
  isAdministrador: boolean = false;
  /**
   * si un usuario es gestor
   */
  isGestor: boolean = false;
  /**
   * si un usuario es normal
   */
  isUserNormal: boolean = false;
  /**
   * array [] de las solicitudes Validadas
   */
  solicitudesValidadas: SolicitudRecurso[] = [];
  /**
   * array [] de las solicitudes Solicitadas
   */
  solicitudesSolicitadas: SolicitudRecurso[] = [];
  /**
   * array [] de las solicitudes Rechazadas
   */
  solicitudesRechazadas: SolicitudRecurso[] = [];
  /**
   * array [] de las solicitudes Canceladas
   */
  solicitudesCanceladas: SolicitudRecurso[] = [];
  /**
   * array [] de las solicitudes Borrador
   */
  solicitudesBorrador: SolicitudRecurso[] = [];
  /**
   * variable estatica array [] de las solicitudes de un Cenad
   */
  static solicitudesCenad: SolicitudRecurso[] = [];
  /**
   * variable estatica que contiene el estado de una solicitud, utilizada para realizar los filtros
   */
  static estadoSolicitud: string = "";

  /** 
   * @param solicitudService contiene todos los metodos del modulo de SolicitudRecurso
   * @param router para redireccionar a otra pagina de la aplicacion
   * @param activateRoute para obtener parametros de la barra de navegacion
   */
  constructor(private solicitudService: SolicitudRecursoService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    /**
   * metodo que obtiene el id del cenad de la barra de navegacion
   */
    this.inicio();
     /**
   * método que comprueba el rol del usuario logeado en el sistema
   */
    this.comprobarUser();
    this.filtrarSolicitudes();
  }

  /**
   * metodo que obtiene el id del cenad de la barra de navegacion
   */
  inicio(): void {
    //captura el parametro id del Cenad desde la barra de navegación
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
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
      if (sessionStorage.isAdmin == "true" && this.idCenad == sessionStorage.idCenad) {
        this.isAdministrador = true;
        } else if (sessionStorage.isGestor == "true" && this.idCenad == sessionStorage.idCenad) {
          this.isGestor = true;
            } else if (sessionStorage.isNormal == "true") {
              this.isUserNormal = true;
            }
    }
  }

  /**
   * metodo que obtiene de la API las solicitudes del Cenad (Solicitadas, Validadas, Rechazadas, Canceladas y Borrador)
   * y las ordena por la fecha de solicitud
   */
  filtrarSolicitudes(): void {
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Solicitada").subscribe((response) => {
      this.solicitudesSolicitadas = this.solicitudService.extraerSolicitudes(response);
    });
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Validada").subscribe((response) => {
      this.solicitudesValidadas = this.solicitudService.extraerSolicitudes(response);
    });
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Rechazada").subscribe((response) => {
      this.solicitudesRechazadas = this.solicitudService.extraerSolicitudes(response);
    });
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Cancelada").subscribe((response) => {
      this.solicitudesCanceladas = this.solicitudService.extraerSolicitudes(response);
    });
    this.solicitudService.getSolicitudesDeCenadEstado(this.idCenad, "Borrador").subscribe((response) => {
      this.solicitudesBorrador = this.solicitudService.extraerSolicitudes(response);
    });
    setTimeout(() => {
      SolicitudesRecursosComponent.solicitudesCenad = this.solicitudesSolicitadas.concat(this.solicitudesValidadas, this.solicitudesRechazadas, this.solicitudesCanceladas, this.solicitudesBorrador);
       //si el usuario logeado es el administrador del Cenad
       let fechaIni: Date;
       let fechaFin: Date;
       if (this.isAdministrador) {
        this.solicitudesValidadas = this.solicitudesValidadas.sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
        }).slice(0, 5);
        this.solicitudesSolicitadas =  this.solicitudesSolicitadas.sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
        }).slice(0, 5);
        this.solicitudesRechazadas = this.solicitudesRechazadas.sort(function (a, b): number {
          return a.fechaSolicitud > b.fechaSolicitud ? 1 : a.fechaSolicitud < b.fechaSolicitud ? -1 : 0;
        }).slice(0, 5);
        this.solicitudesCanceladas = this.solicitudesCanceladas.sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
        }).slice(0, 5);
        this.solicitudesBorrador = this.solicitudesBorrador.sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
        }).slice(0, 5);
        //si el usuario logeado es el normal
      } else if (this.isUserNormal) {
        this.solicitudesValidadas = this.solicitudesValidadas.filter(s => s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesSolicitadas = this.solicitudesSolicitadas.filter(s => s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesRechazadas = this.solicitudesRechazadas.filter(s => s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesCanceladas = this.solicitudesCanceladas.filter(s =>s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesBorrador = this.solicitudesBorrador.filter(s => s.usuarioNormal.unidad.idUnidad == sessionStorage.idUnidad).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        //si el usuario logeado es un gestor
      } else if (this.isGestor) {
        this.solicitudesValidadas = this.solicitudesValidadas.filter(s => s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
            fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
            fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
            return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesSolicitadas = this.solicitudesSolicitadas.filter(s => s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesRechazadas =  this.solicitudesRechazadas.filter(s => s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesCanceladas =  this.solicitudesCanceladas.filter(s => s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
        this.solicitudesBorrador = this.solicitudesBorrador.filter(s => s.recurso.usuarioGestor.idUsuario == sessionStorage.idUsuario).sort(function (a, b): number {
          fechaIni = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(a.fechaSolicitud);
          fechaFin = SolicitudesRecursosComponent.cambiarFormatoDate2sinHora(b.fechaSolicitud);
          return fechaIni > fechaFin ? 1 : fechaIni < fechaFin ? -1 : 0;
          }).slice(0, 5);
      }
    }, 8000);
  }

  
  /**
   * método que se ejecuta al hacer click sobre "Ver Todas"
   * asigna a la variable estática estadoSolicitud el valor del estado de la solicitud donde se ha realizado click
   * redirecciona a la página solicitudesTodas
   * @param tipo string que contiene el estado de la solicitud donde se ha hecho click sobre "Ver Todas"
   */
  verTodas(tipo: string): void {
    SolicitudesRecursosComponent.estadoSolicitud = tipo;
    this.router.navigate([`principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}/solicitudesTodas/${this.idCenad}`]);
  }

  /**
   * metodo estático que recibe un parametro string y lo transforma a un Date con formato yyyy-MM-dd
   * @param date string
   * @returns la fecha en formato Date
   */  
  static cambiarFormatoDate2sinHora(fecha: string): Date {
    let arrayDate: any[] = fecha.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2]);
    return fechaDate;
  }
 
   /**
    * método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd HH:mm:ss
    * 
    * @param fecha string
    * @returns string
    */
   actualizarFechaInv2(fecha: string): string {
    let fechaActualizadaInv = fecha.slice(0,2) + "-" + fecha.slice(3,5) + "-" + fecha.slice(6,10) + " " +  fecha.slice(11,13) + ":" + fecha.slice(14,16) + ":" + fecha.slice(17,19);
    return  fechaActualizadaInv;
  }

  /**
   * método que recibe como parámetro un dato tipo string y devuelve un dato tipo Date con el formato 'yyyy-MM-dd HH:mm:ss'
   * @param date string
   * @returns Date
   */
  cambiarFormatoDate2(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }
}

