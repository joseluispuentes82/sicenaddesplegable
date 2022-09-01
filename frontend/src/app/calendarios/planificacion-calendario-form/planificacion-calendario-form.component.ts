import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { SolicitudRecursoService } from 'src/app/solicitudes-recursos/service/solicitud-recurso.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { Unidad } from 'src/app/unidades/models/unidad';
import { SolicitudCalendario } from '../models/solicitud-calendario';
import { SolicitudCalendarioImpl } from '../models/solicitud-calendario-impl';

@Component({
  selector: 'app-planificacion-calendario-form',
  templateUrl: './planificacion-calendario-form.component.html',
  styleUrls: ['./planificacion-calendario-form.css'],
  providers: [DatePipe]
})
export class PlanificacionCalendarioFormComponent implements OnInit {
  /**
   * variable para icono FontAwesome
   */
  faVolver = faArrowAltCircleLeft;
  /**
   * variable para icono FontAwesome
   */
  faLectura = faReadme;
  /**
   * variable para icono FontAwesome
   */
  faEdit = faEdit;
  /**
   * variable para el id de la solicitud
   */
  idSolicitud: string = "";
  /**
   * variable para el id del Cenad
   */
  idCenad: string = "";
  /**
   * variable para parsear la fecha de la solicitud
   */
  fechaSolicitudParse: string;
  /**
   * variable para parsear la fecha de inicio del recurso
   */
  fechaInicioParse: string;
  /**
   * variable para parsear la fecha de fin del recurso
   */
  fechaFinParse: string;
  /**
   * variable para cambiar de edicion/creacion en el formulario
   */
  boton: boolean = true;
  /**
   * variable para comprobacion si un usuario se ha autenticado
   */
  isAutenticado: boolean = false;
  /**
   * variable para controlar si un Usuario es superAdministrador
   */
  isSuperAdmin: boolean = false;
  /**
   * variable para controlar si un Usuario es Administrador 
   */
  isAdministrador: boolean = false;
  /**
   * variable para instancia objeto Solicitud
   */
  solicitud: SolicitudCalendario = new SolicitudCalendarioImpl();
  /**
   * variable para instancia objeto Categoria
   */
  //a
  categoriaSeleccionada: Categoria = new CategoriaImpl();
  /**
   * variable para endpoint del recurso seleccionado
   */
  uRlRecursoSeleccionado: string = "";
  /**
   * variable para instancia objeto Recurso
   */
  recurso: Recurso = new RecursoImpl();
  /**
   * variable para array[] de Recursos de una categoria
   */
  recursosDeCategoria: Recurso[] = [];
  /**
   * variable para array[] de las categorías de un Cenad
   */
  categoriasCenad: Categoria[] = [];
  /**
   * variable para array[] de las categorias filtradas
   */
  categoriasFiltradas: Categoria[] = [];
  /**
   * variable para array[] de Unidades
   */
  unidades: Unidad[] = [];
  /**
   * variable para array[] de CENAD/CMT
   */
  cenads: Cenad[] = [];
  /**
   * variable para echa actual del sistema
   */
  fechaActual: string;
  /**
   * variable para el nombre del usuario loggeado
   */
  nombreUser: string = "";
  /**
   * variable para el id del usuario logggeado
   */
  idUser: string = "";
  /**
   * variable para el nombre de la unidad seleccionada
   */
  unidadSeleccionada: string = "";
  /**
   * variable para el nombre del CENAD/CMT
   */
  nombreCenad: string = "";


  /**
   * @param activateRoute para capturar los parametros de la barra de navegacion
   * @param solicitudService contiene los metodos propios de 'solicitudRecurso'
   * @param recursoService contiene los metodos propios de 'recurso'
   * @param router para redireccionar a una pagina web
   * @param miDatePipe para parserar fechas
   */
  constructor(private activateRoute: ActivatedRoute, private solicitudService: SolicitudRecursoService,
    private recursoService: RecursoService, private router: Router, private miDatePipe: DatePipe) { }

  ngOnInit() {
    /**
   * metodo que captura los parámetros (idSolicitud y idCenad) de la barra de navegacion
   */
    this.getParams();
    /**
   * metodo que comprueba el rol del usuario logeado en el sistema
   */
    this.comprobarUser();
     /**
   * metodo que captura la fecha actual y actualiza la variable local fechaActual: string en formato YYYY-MM-dd (input date)
   */
    this.getFechaActual();
    /**
   * metodo que obtiene del local storage todas las categorías del Cenad
   */
    this.getCategorias();
     /**
   * metodo que obtiene del local storage todas las Unidades
   */
    this.getUcos();
    /**
     * metodo que obtiene del local storage todos los CENAD/CMT
     */
    this.getCenads();
    /**
   * metodo para cargar los datos iniciales
   */
    this.cargaDatos();
    /**
   * metodo que comprueba si llega como parametro, a traves de la barra de navegacion, el id de la solicitud a editar
   * inicializando las variables correspondientes
   */
    this.iniCreateEditSolicitud();
  }

  /**
   * metodo que captura los parámetros (idSolicitud y idCenad) de la barra de navegacion
   */
  getParams(): void {
    this.idSolicitud = this.activateRoute.snapshot.params['idSolicitud'];
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  /**
   * metodo que comprueba el rol del usuario logeado en el sistema
   */
  comprobarUser(): void {
    if (sessionStorage.isLogged == undefined) {
      this.isAutenticado = false;
    } else {
      sessionStorage.isLogged.toString() == "true" ? this.isAutenticado = true : this.isAutenticado = false;
    }
    if (this.isAutenticado) {
      if (sessionStorage.isSuperAdmin == "true") {
        this.isSuperAdmin = true;
      }
      if (sessionStorage.isAdmin == "true" && this.idCenad == sessionStorage.idCenad) {
        this.isAdministrador = true;
      }
    }
  }

  /**
   * metodo que captura la fecha actual y actualiza la variable local fechaActual: string en formato YYYY-MM-dd (input date)
   */
  getFechaActual(): void {
    const tiempoTranscurrido = Date.now();
    this.fechaActual = this.cambiarFormatoDateStringsinHora(new Date(tiempoTranscurrido).toString());
  }

  /**
   * metodo que obtiene del local storage todas las categorías del Cenad
   */
  getCategorias(): void {
    this.categoriasCenad = JSON.parse(localStorage.getItem(`categorias_${this.idCenad}`));
  }

  /**
   * metodo que obtiene del local storage todas las Unidades
   */
  getUcos(): void {
    this.unidades = JSON.parse(localStorage.unidades);
  }
  /**
   * metodo que obtiene del local storage todos los CENAD/CMT
   */
  getCenads(): void {
    this.cenads = JSON.parse(localStorage.cenads);
  }

  /**
   * metodo para cargar los datos iniciales
   */
  cargaDatos(): void {
    this.nombreUser = sessionStorage.nombreUsuario;
  }

  /**
   * metodo que comprueba si llega como parametro, a traves de la barra de navegacion, el id de la solicitud a editar
   * inicializando las variables correspondientes
   */
  iniCreateEditSolicitud(): void {
    if (this.idSolicitud != "") { //edicion
      this.boton = false;
      this.solicitudService.getSolicitudCalendario(this.idSolicitud).subscribe((response) => {
        this.solicitud = this.solicitudService.mapearSolicitudPlanificada(response);
        this.fechaSolicitudParse = this.actualizarFechaInv(this.solicitud.fechaSolicitud);
        this.fechaInicioParse = this.actualizarFechaInv(this.solicitud.fechaHoraInicioRecurso);
        this.fechaFinParse = this.actualizarFechaInv(this.solicitud.fechaHoraFinRecurso);
        this.isSuperAdmin ? this.unidadSeleccionada = this.solicitud.unidadUsuaria :
        this.isAdministrador ? this.nombreCenad = this.solicitud.unidadUsuaria : "";
      });
      setTimeout(() => {
        this.solicitudService.getRecursoDeSolicitud(this.idSolicitud).subscribe((response) => {
          this.solicitud.recurso = this.solicitudService.mapearRecurso((response));
        });
      }, 1200);

      setTimeout(() => {
        this.uRlRecursoSeleccionado = this.solicitud.recurso.url;
        this.categoriaSeleccionada = this.solicitud.recurso.categoria;
        this.filtrar();
      }, 2000);

    } else { //creacion
      if (this.isSuperAdmin) {
        this.solicitud.estado = "Planificada";
        this.solicitud.etiqueta = "#1CC7F2"
      }
      if (this.isAdministrador) {
        this.solicitud.estado = "Aviso";
        this.solicitud.etiqueta = "#ff7433";
        this.cenads.forEach(c => {
          c.idCenad.toString() == this.idCenad ? this.nombreCenad = c.nombre.toString() : "";
        });
      }      
      this.fechaSolicitudParse = this.fechaActual;
    }
  }


  /**
   * metodo que asigna los valores de las fechas del formulario a los distintos campos del objeto solicitud
   */
  actualizarFechas(): void {
    this.solicitud.fechaSolicitud = this.actualizarFechaSolicitud(this.fechaSolicitudParse);
    this.solicitud.fechaHoraInicioRecurso = this.actualizarFechaSolicitud(this.fechaInicioParse);
    this.solicitud.fechaHoraFinRecurso = this.actualizarFechaSolicitud(this.fechaFinParse);
  }

  /**
   * metodo que actualiza los datos necesarios antes de crear, actualizar una solicitud
   */
  actualizarDatos(): void {
    this.actualizarFechas();
    //si el usuario es superAdmin asigna el nombre de la Unidad seleccionada en el form (select)
    //y si el usuario es Administrador asigna el nombre del CENAD en el nombre de la Unidad Usuaria
    this.isSuperAdmin ? this.solicitud.unidadUsuaria = this.unidadSeleccionada : 
    this.isAdministrador ? this.solicitud.unidadUsuaria = this.nombreCenad : "";
    //asigna el endopint del recurso seleccionado en la solicitud
    this.solicitud.recurso = this.uRlRecursoSeleccionado;
  }

  /**
   * metodo que crea una solicitud con los datos del formulario y redirecciona a la pagina de solicitudes de recursos
   */
  create(): void {
    this.actualizarDatos();
    this.solicitudService.createSolicitudCalendario(this.solicitud).subscribe((response) => {
      this.router.navigate([`/principalCenad/${this.idCenad}/calendarios/${this.idCenad}`]);
    });
  }

  /**
   * metodo que borra una solicitud, solicitando previamente confirmacion
   */
  borrarSolicitud(): void {
    if (confirm('Va a eliminar una Solicitud, ¿Está seguro?')) {
      this.solicitudService.deleteSolicitudCalendario(this.solicitud).subscribe((response) => {
        this.router.navigate([`/principalCenad/${this.idCenad}/calendarios/${this.idCenad}`]);
      });
    }
  }

  /**
   * metodo que se ejecuta al hacer click sobre el boton Actualizar
   * actualiza los datos del formulario y solicita confirmación para tramitar la solicitud
   * en caso afirmativo, cambia el estado y redirecciona a la paǵina de solicitudes de recursos
   */
  actualizar(): void {
    this.actualizarDatos();
    this.solicitudService.updateSolicitudCalendario(this.idSolicitud, this.solicitud).subscribe((response) => {
      this.router.navigate([`/principalCenad/${this.idCenad}/calendarios/${this.idCenad}`]);
    });
  }

  /**
   * metodo que se ejecuta cuando se produce un cambio en el input de la fecha del formulario
   * comprueba si la fecha de fin de recurso es menor que la fecha de inicio
   * en caso afirmativo muestra un mensaje por pantalla e inicializa el valor de la fecha
   */
  verificarFechas(): void {
    if (this.cambiarFormatoDate2sinHora(this.fechaFinParse) < this.cambiarFormatoDate2sinHora(this.fechaInicioParse)) {
      alert('La fecha de FIN debe ser mayor que la de INICIO');
      this.fechaFinParse = "";
    }
  }

  /**
   * metodo que recibe un parametro string y lo transforma a un Date con formato yyyy-MM-dd
   * @param date string
   * @returns la fecha en formato Date
   */
  cambiarFormatoDate2sinHora(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2]);
    return fechaDate;
  }

  /**
   * metodo que recibe un parametro string y lo transforma a un string con formato yyyy-MM-dd
   * @param date string
   * @returns la fecha en formato Date
   */
  cambiarFormatoDateStringsinHora(date: string): string {
    let stringDate = this.miDatePipe.transform(date, 'yyyy-MM-dd');
    return stringDate;
  }

  /**
   * metodo que recibe un parametro string y lo transforma a un string con formato yyyy-MM-dd
   * @param fecha string
   * @returns la fecha en formato string
   */
  //
  actualizarFechaInv(fecha: string): string {
    let fechaActualizadaInv = fecha.slice(6, 10) + "-" + fecha.slice(3, 5) + "-" + fecha.slice(0, 2);
    return fechaActualizadaInv;
  }

  /**
   * metodo que recibe como parametro string la fecha de la solicitud y lo transforma a un string con formato dd-MM-yyyy 00:00:00
   * @param fecha string
   * @returns la fecha en formato string
   */
  //
  actualizarFechaSolicitud(fecha: string): string {
    let fechaActualizada = fecha.slice(8, 11) + "-" + fecha.slice(5, 7) + "-" + fecha.slice(0, 4) + " 00:00:01";
    return fechaActualizada;
  }

  /**
   * metodo para filtrar recursivamente las categorias
   */
  filtrar() {
    //rescata de la BD las subcategorias de la categoria seleccionada
    this.recursoService.getSubcategorias(this.categoriaSeleccionada).subscribe((response) =>
      this.categoriasFiltradas = this.recursoService.extraerCategorias(response));
    setTimeout(() => {
      //si la categoria seleccionada no tiene subcategorias muestra los recursos de esa categoria
      if (this.categoriasFiltradas.length === 0) {
        //rescatamos de la BD los recursos de ese cenad de esa categoria seleccionada
        this.recursoService.getRecursosDeCategoria(this.categoriaSeleccionada).subscribe((response) => {
          if (response._embedded) {//con este condicional elimino el error de consola si no hay ningun recurso
            this.recursosDeCategoria = this.recursoService.extraerRecursos(response);
          }
        });
      } else {//muestra los recursos de sus subcategorias, esten al nivel que esten
        this.recursoService.getRecursosDeSubcategorias(this.categoriaSeleccionada).subscribe((response) => this.recursosDeCategoria = this.recursoService.extraerRecursos(response));
      }
    }, 500);
  }

  /**
   * metodo que resetea los filtros y regresa al listado de recursos del cenad
   */
  borrarFiltros() {
    //rescata del local storage las categorias padre del cenad
    this.categoriasFiltradas = JSON.parse(localStorage.getItem(`categoriasPadre_${this.idCenad}`));
    //rescatamos del local storage los recursos de ese cenad
    this.recursosDeCategoria = JSON.parse(localStorage.getItem(`recursos_${this.idCenad}`));
    //resetea la categoria seleccionada
    this.categoriaSeleccionada = new CategoriaImpl();
    this.uRlRecursoSeleccionado = "";
  }
}
