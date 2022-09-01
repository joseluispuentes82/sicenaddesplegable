import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Arma } from 'src/app/armas/models/arma';
import { ArmaImpl } from 'src/app/armas/models/arma-impl';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaImpl } from 'src/app/categorias/models/categoria-impl';
import { CategoriaFichero } from 'src/app/categoriasFichero/models/categoriaFichero';
import { Fichero } from 'src/app/recursos/models/fichero';
import { FicheroImpl } from 'src/app/recursos/models/fichero-impl';
import { Recurso } from 'src/app/recursos/models/recurso';
import { RecursoImpl } from 'src/app/recursos/models/recurso-impl';
import { RecursoService } from 'src/app/recursos/service/recurso.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { TipoFormulario } from 'src/app/tiposFormulario/models/tipoFormulario';
import { Unidad } from 'src/app/unidades/models/unidad';
import { UnidadImpl } from 'src/app/unidades/models/unidad-impl';
import { UnidadService } from 'src/app/unidades/service/unidad.service';
import { UsuarioAdministrador } from 'src/app/usuarios/models/usuarioAdministrador';
import { UsuarioNormal } from 'src/app/usuarios/models/usuarioNormal';
import { environment } from 'src/environments/environment';
import { SolicitudArma } from '../models/solicitud-arma';
import { SolicitudArmaImpl } from '../models/solicitud-arma-impl';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoImpl } from '../models/solicitud-recurso-impl';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';
import { SolicitudesRecursosComponent } from '../solicitudes-recursos/solicitudes-recursos.component';

@Component({
  selector: 'app-solicitud-recurso-form',
  templateUrl: './solicitud-recurso-form.component.html',
  styleUrls: ['./solicitud-recurso-form.component.css'],
  providers: [DatePipe]
})
export class SolicitudRecursoFormComponent implements OnInit {
  /**
   * icono FontAwesome 'volver'
   */
  faVolver = faArrowAltCircleLeft;
  /**
   * icono FontAwesome 'lectura'
   */
  faLectura = faReadme;
  /**
   * icono FontAwesome 'editar'
   */
  faEdit = faEdit;
  /**
   * id de la solicitud
   */
  idSolicitud: string = "";
  /**
   * id del Cenad
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
   * variable para parsear la fecha del montaje
   */
  fechaMontajeParse: string;
  /**
   * variable para parsear la fecha del desmontaje
   */
  fechaDesmontajeParse: string;
  /**
   * variable para parsear la fecha de fin de la documentacion
   */
  fechaFinDocuParse: string;
  /**
   * estado seleccionado de la solicitud
   */
  estadoSeleccionado: string = "";
  /**
   * estado anterior de la solicitud
   */
  estadoAnterior: string = "";
  /**
   * estado de la solicitud
   */
  estado: string = "";
  /**
   * nombre de la unidad
   */
  unidad: string = "";
  /**
   * para cambiar de edicion/consulta el formulario de solicitudes de armas
   */
  isConsultaArmas: boolean = true;
  /**
   * para cambiar de edición/creación en el formulario
   */
  boton: boolean = true;
  /**
   * comprobación si un usuario se ha autenticado
   */
  isAutenticado: boolean = false;
  /**
   * si un Usuario es Normal
   */
  isUsuarioNormal: boolean = false;
  /**
   * si un usuario es Administrador
   */
  isAdministrador: boolean = false;
  /**
   *  si un usuario es Gestor   * 
   */
  isGestor: boolean = false;
  /**
   * si la solicitud tiene el estado borrador
   */
  isBorrador: boolean = false;
  /**
   * si el estado de la solicitud es Validad
   */
  isValidada: boolean = false;
  /**
   * si el estado de la solicitud es Solicitada
   */
  isSolicitada: boolean = false;
  /**
   * si la solicitud ha sido ya creada
   */
  isSolicitudCreada: boolean = false;
  /**
   * si la fecha de fin documentacion es igual a la fecha actual
   */
  isFechaFinDocu: boolean = false;
  /**
   * si se entra en el formulario de edicion del fichero con atributos de solo consulta
   */
  isSoloConsultaGestor: boolean = false;
  /**
   * si se entra en el formulario de edicion del fichero con atributos de solo consulta
   */
  isSoloConsultaUser: boolean = false;
  /**
   * id de la solicitud creada
   */
  idSolicitudCreada: string = "";
  /**
   * instancia objeto SolicitudRecurso
   */
  solicitud: SolicitudRecurso = new SolicitudRecursoImpl();
  /**
   * instancia objeto usuario Administrador
   */
  usuarioAdministrador: UsuarioAdministrador;
  /**
   * instancia objeto UsuarioNormal
   */
  usuarioNormal: UsuarioNormal;
  /**
   * instancia objeto Categoría
   */
  categoriaSeleccionada: Categoria = new CategoriaImpl();
  /**
   * instancia objeto Unidad
   */
  unidadSeleccionada: Unidad = new UnidadImpl();
  /**
   * endpoint del recurso seleccionado
   */
  uRlRecursoSeleccionado: string = "";
  /**
   * instancia objeto Recurso
   */
  recurso: Recurso = new RecursoImpl();
  /**
   * array[] de Recursos de una categoría
   */
  recursosDeCategoria: Recurso[] = [];
  /**
   * array[] de las categorías de un Cenad
   */
  categoriasCenad: Categoria[] = [];
  /**
   * array[] de las categorias filtradas
   */
  categoriasFiltradas: Categoria[] = [];
  /**
   * array[] de Unidades
   */
  unidades: Unidad[] = [];
  /**
   * array[] de Usuarios Normales
   */
  usuariosNormales: UsuarioNormal[] = [];
  /**
   * array[] de Tipos de Formularios
   */
  tiposFormulario: TipoFormulario[] = [];
  /**
   * array[] de Solicitudes del Cenad
   */
  solicitudesCenad: SolicitudRecurso[] = [];
  /**
   * array[] de Solicitudes del cen
   */
  solicitudesCenadTrabajo: SolicitudRecurso[] = [];
  /**
   * array[] de disponibildiad de Solicitudes del Cenad
   */
  solicitudesDisponibilidadCenad: SolicitudRecurso[] = [];
  /**
   * fecha actual del sistema
   */
  fechaActual: string;
  /**
   * nombre del usuario loggeado
   */
  nombreUser: string = "";
  /**
   * id del usuario logeado
   */
  idUser: string = "";
  /**
   * id de la unidad del usuario normal
   */
  idUnidad: string = "";
  /**
   * nombre de la unidad del usuario normal loggeado
   */
  nombreUnidad: string = "";
  /**
   * endpoint usuario normal loggeado
   */
  urlUsuarioNormal: string = "";
  /**
   * id del Tipo de Formulario seleccionado
   */
  codTipoFormSeleccionado: string = "";
  // DATOS ESPECIFICOS
  //Zona Caida Proyectiles/Explosivos
  /**
   * si es zona de caida de proyectiles
   */
  isZonaCaida: boolean = true;
  /**
   * si se utiliza munición trazadora, iluminante o fumigena
   */
  isConMunTrazIluFumig: boolean = false;
  /**
   * variable estática que contiene el array de solicitudesArmas
   */
  static solicitudesArmasZCdeSolicitud: SolicitudArma[] = [];
  /**
   * array [] de solicitudes de Armas
   */
  solicitudesArmas: SolicitudArma[] = [];
  /**
   * array [] de Armas
   */
  armas: Arma[] = [];
  /**
   * instancia objeto Solicitud de Arma
   */
  solicitudArma: SolicitudArma = new SolicitudArmaImpl();
  /**
   * instancia objeto Solicitud de Arma, cuando se edita sus datos
   */
  solicitudArmaVerDatos: SolicitudArma = new SolicitudArmaImpl();
  /**
  * instancia objeto Arma, cuando se edita sus datos
  */
  armaVerDatos: Arma = new ArmaImpl();
  /**
  * instancia Arma, cuando se actualiza sus datos
  */
  armaActualizada = new ArmaImpl();
  /**
   * si el arma se ha creado o se está editando
   */
  nuevaArma: boolean = false;
  /**
   * id del arma seleccionada
   */
  idArmaSeleccionada: string = "";
  /**
   * tipo de tiro seleccionado
   */
  tipoTiroSeleccionado: string = "";
  //Campo Tiro Carros, VCI/C, Precisión
  /**
   * si es campo de tiro carros
   */
  isCTcarros: boolean = false;
  //Campo Tiro Laser
  /**
   * si es un campo de tiro laser
   */
  isCTlaser: boolean = false;
  //Campo Tiro
  /**
   * si es campo de tiro
   */
  isCampoTiro: boolean = false;
  //Explosivos
  /**
   * si es un campo de explosivos
   */
  isCampoExplosivos: boolean = false;
  //Ejercicio Zona Restringida
  /**
   * si es zona restringida
   */
  isZonaRestringida: boolean = false;
  //Acantonamiento-Vivac
  /**
   * si es Vivac
   */
  isAcanVivac: boolean = false;
  //Zona de vida Batallón
  /**
   * si es zona de vida de batallon
   */
  isZonaVidaBon: boolean = false;
  //Zona de Espera
  /**
   * si es zona de espera
   */
  isZonaEspera: boolean = false;
  //Lavaderos
  /**
   * si es lavaderos
   */
  isLavaderos: boolean = false;
  //Simulación Real Láser
  /**
   * si es simulacion real laser
   */
  isSimulacionRealLaser: boolean = false;
  //Otros
  /**
   * si es otros recursos
   */
  isOtros: boolean = false;
  /**
   * variable que da visibilidad al formulario de crear un fichero para el Cenad
   */
  nuevoFicheroCenad: boolean = false;
  /**
   * variable que da visibilidad al formulario de crear un fichero para la Unidad
   */
  nuevoFicheroUnidad: boolean = false;
  /**
   * variable que comunicara los datos del fichero
   */
  ficheroVerDatos: FicheroImpl;
  /**
   * variable sobre la que crearemos un fichero nuevo Cenad
   */
  fichero: Fichero = new FicheroImpl();
  /**
   * variable con todos los ficheros del Cenad
   */
  ficherosCenad: Fichero[] = [];
  /**
   * variable con todos los ficheros de la Unidad
   */
  ficherosUnidad: Fichero[] = [];
  /**
   * variable para dar al gestor la opcion de elegir
   * que categoria de fichero asignar a cada fichero
   */
  categoriasFichero: CategoriaFichero[] = [];
  /**
   * variables para subida de archivos
   */
  pathRelativo: string = `${environment.hostSicenad}files/docSolicitudes/${this.solicitud.idSolicitud}/`;
  /**
   * lista de ficheros seleccionados
   */
  selectedFiles: FileList;
  /**
   * fichero
   */
  currentFile: File;
  /**
   * tamaño maximo de la documentacion de la solicitud
   */
  sizeMaxDocSolicitud: number = environment.sizeMaxDocSolicitud;
  /**
   * tamaño maximo del escudo
   */
  sizeMaxEscudo: number = environment.sizeMaxEscudo;
  /**
   * si el archivo se ha subido al repositorio
   */
  archivoSubido: boolean = false;

  constructor(private activateRoute: ActivatedRoute, private solicitudService: SolicitudRecursoService,
    private recursoService: RecursoService, private router: Router, private miDatePipe: DatePipe,
    private unidadService: UnidadService, private appConfigService: AppConfigService) { }

  ngOnInit() {
    this.resetearVariables();
    this.getParams();
    this.iniVarFicheros();
    this.comprobarUser();
    this.getFechaActual();
    this.getCategorias();
    this.getUcos();
    this.getArmas();
    this.getUsuariosNormales();
    this.getTiposFormulario();
    this.cargaDatos();
    this.iniCreateEditSolicitud();
  }

  /**
   * método que resetea las variables
   */
  resetearVariables(): void {
    this.isZonaCaida = false;
    this.isCTcarros = false;
    this.isCTlaser = false;
    this.isCampoTiro = false;
    this.isCampoExplosivos = false;
    this.isZonaRestringida = false;
    this.isAcanVivac = false;
    this.isZonaVidaBon = false;
    this.isZonaEspera = false;
    this.isLavaderos = false;
    this.isSimulacionRealLaser = false;
    this.isOtros = false;
  }

  /**
   * método que captura los parámetros (idSolicitud y idCenad) de la barra de 
   * navegación
   */
  getParams(): void {
    this.idSolicitud = this.activateRoute.snapshot.params['idSolicitud'];
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
        this.isConsultaArmas = true;
      } else if (sessionStorage.isGestor == "true" && this.idCenad == sessionStorage.idCenad) {
        this.isGestor = true;
        this.isConsultaArmas = true;
      } else if (sessionStorage.isNormal == "true") {
        this.isUsuarioNormal = true;
      }
    }
  }

  /**
   * método que captura la fecha actual y actualiza la variable local 
   * fechaActual: string en formato YYYY-MM-dd (input date)
   */
  getFechaActual(): void {
    const tiempoTranscurrido = Date.now();
    this.fechaActual = this.cambiarFormatoDateStringsinHora(new Date(tiempoTranscurrido).toString());
  }

  /**
   * método que obtiene del local storage todas las categorías del Cenad
   */
  getCategorias(): void {
    this.categoriasCenad = JSON.parse(localStorage.getItem(`categorias_${this.idCenad}`));
  }

  /**
   * método que obtiene del local storage todas las Unidades
   */
  getUcos(): void {
    this.unidades = JSON.parse(localStorage.unidades);
  }

  /**
   * método que obtiene del local storage todas las armas
   */
  getArmas(): void {
    this.armas = JSON.parse(localStorage.armas);
  }

  /**
   * metodo que obtiene del local storage todos los Usuarios Normales
   */
  getUsuariosNormales(): void {
    this.usuariosNormales = JSON.parse(localStorage.usuariosNormal);
  }

  /**
   * metodo que obtiene del local storage los tipos de formulario
   */
  getTiposFormulario(): void {
    this.tiposFormulario = JSON.parse(localStorage.tiposFormulario);
  }

  /**
   * método para cargar los datos iniciales
   */
  cargaDatos(): void {
    this.nombreUser = sessionStorage.nombreUsuario;
    this.idUser = sessionStorage.idUsuario;
    if (sessionStorage.isNormal == "true") {
      this.idUnidad = sessionStorage.idUnidad;
      this.unidades.forEach(u => {
        u.idUnidad == this.idUnidad ? this.nombreUnidad = u.nombre : "";
      });
    }
    this.solicitudesCenad = SolicitudesRecursosComponent.solicitudesCenad;
    // this.solicitudesArmasNuevas = [];
  }

  /**
   * inicializa variables de ficheros
   */
  iniVarFicheros(): void {
    //recupera del Local Storage todas las categorias de fichero y las guarda en la variable para poder seleccionarlas si se añade un fichero nuevo
    this.categoriasFichero = JSON.parse(localStorage.categoriasFichero);
    //para que use el valor del properties.json
    this.sizeMaxDocSolicitud = this.appConfigService.sizeMaxDocSolicitud ? this.appConfigService.sizeMaxDocSolicitud : environment.sizeMaxDocSolicitud;
    this.sizeMaxEscudo = this.appConfigService.sizeMaxEscudo ? this.appConfigService.sizeMaxEscudo : environment.sizeMaxEscudo;
  }


  /**
   * carga los ficheros de una solicitud
   */
  cargarDatosFicheros(): void {
    //recupera de la BD los ficheros del recurso y los asigna a la variable
    this.recursoService.getFicherosSolicitudCenad(this.idSolicitud).subscribe((response) =>
      this.ficherosCenad = this.recursoService.extraerFicheros(response));
    //recupera de la BD los ficheros del recurso y los asigna a la variable
    this.recursoService.getFicherosSolicitudUnidad(this.idSolicitud).subscribe((response) =>
      this.ficherosUnidad = this.recursoService.extraerFicheros(response));
    //asigna el path relativo, que junto con el nombreArchivo del fichero formara la url en la que se encuentra el archivo
    this.pathRelativo = this.appConfigService.hostSicenad ? `${this.appConfigService.hostSicenad}files/docSolicitudes/${this.solicitud.idSolicitud}/` : `${environment.hostSicenad}files/docSolicitudes/${this.solicitud.idSolicitud}/`;
  }



  //
  /**
   * método que comprueba si llega como parámetro, a través de la barra de navegación, 
   * el id de la solicitud a editar
   * inicializando las variables correspondiente  //s
   */
  iniCreateEditSolicitud(): void {
    if (this.idSolicitud != "") { //edición
      this.boton = false;
      this.solicitudService.getSolicitud(this.idSolicitud).subscribe((response) => {
        this.solicitud = this.solicitudService.mapearSolicitud(response);
        if (this.isGestor) {
          this.fichero.solicitudRecursoCenad = this.solicitudService.mapearSolicitud(response).url;
        }
        if (this.isUsuarioNormal) {
          this.fichero.solicitudRecursoUnidad = this.solicitudService.mapearSolicitud(response).url;
        }
        this.fechaSolicitudParse = this.actualizarFechaInv(this.solicitud.fechaSolicitud);
        if (this.solicitud.fechaFinDocumentacion) {
          this.fechaFinDocuParse = this.actualizarFechaInv(this.solicitud.fechaFinDocumentacion);
        }
        this.fechaInicioParse = this.solicitud.fechaHoraInicioRecurso;
        this.fechaFinParse = this.solicitud.fechaHoraFinRecurso;
        this.solicitud.estado === "Borrador" ? this.isBorrador = true : this.isBorrador = false;
        this.solicitud.estado === "Solicitada" ? this.isSolicitada = true : this.isSolicitada = false;
        this.solicitud.estado === "Validada" ? this.isValidada = true : this.isValidada = false;
        this.isAdministrador ? this.estadoSeleccionado = this.solicitud.estado : this.estado = this.solicitud.estado;
        this.isUsuarioNormal && this.isBorrador ? this.isConsultaArmas = false : this.isUsuarioNormal && !this.isBorrador ? this.isConsultaArmas = true : "";

      });
      setTimeout(() => {
        this.solicitudService.getUsuarioNormalDeSolicitud(this.idSolicitud).subscribe((response) => {
          this.solicitud.usuarioNormal = this.solicitudService.mapearUsuarioNormal(response);
        });
        this.solicitudService.getRecursoDeSolicitud(this.idSolicitud).subscribe((response) => {
          this.solicitud.recurso = this.solicitudService.mapearRecurso((response));
        });
      }, 1500);

      setTimeout(() => {
        this.uRlRecursoSeleccionado = this.solicitud.recurso.url;
        //si el tipo de formulario del recurso es "Simulacion real laser, codTipo = 10"
        if (this.solicitud.recurso.tipoFormulario.codTipo == "10") {
          this.fechaMontajeParse = this.actualizarFechaInv2(this.solicitud.fechaHoraMontaje);
          this.fechaDesmontajeParse = this.actualizarFechaInv2(this.solicitud.fechaHoraDesmontaje);
        }
        //si el tipo de formulario del recurso es "Zona de Caida de proyectiles/eplosivos, codTipo = 1"
        //obtiene todas las solicitudesArmas de esa solicitud
        if (this.solicitud.recurso.tipoFormulario.codTipo == "1") {
          this.getSolicitudesArmasdeSolicitud();
          this.isConMunTrazIluFumig = this.solicitud.conMunTrazadoraIluminanteFumigena;
        }
        this.categoriaSeleccionada = this.solicitud.recurso.categoria;
        this.unidad = this.solicitud.usuarioNormal.unidad.nombre;

        // console.log(this.solicitud.otrosDatosEspecificos);
        this.cargarDatosFicheros();
        this.filtrarTipoFormulario();
        this.filtrar();
        this.solicitud.fechaFinDocumentacion ? this.comprobarFechaFinDocu() : "";
      }, 3000);

    } else { //creación
      this.estado = "Borrador";
      this.solicitud.estado = "Borrador";
      this.solicitud.etiqueta = "#ffbafd"
      this.isBorrador = true;
      this.unidad = this.nombreUnidad;
      this.fechaSolicitudParse = this.fechaActual;
      this.solicitudesArmas = SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud = [];
    }
  }

  /**
   * método que compara la fecha de fin de documentacion con la fecha actual
   */
  comprobarFechaFinDocu(): void {
    this.cambiarFormatoDate2(this.fechaFinDocuParse) >= this.cambiarFormatoDate2(this.fechaActual) ? this.isFechaFinDocu = true : this.isFechaFinDocu = false;
  }

  /**
   * método que asigna los valores de las fechas del formulario a los distintos 
   * campos del objeto solicitud
   */
  actualizarFechas(): void {
    this.solicitud.fechaSolicitud = this.actualizarFechaSolicitud(this.fechaSolicitudParse);
    if (this.isGestor) {
      !this.fechaFinDocuParse ? this.solicitud.fechaFinDocumentacion = "" : this.solicitud.fechaFinDocumentacion = this.actualizarFechaSolicitud(this.fechaFinDocuParse);
    }
    this.solicitud.fechaHoraInicioRecurso = this.fechaInicioParse;
    this.solicitud.fechaHoraFinRecurso = this.fechaFinParse;
    if (this.isSimulacionRealLaser) {
      this.solicitud.fechaHoraMontaje = this.fechaMontajeParse + "[.000][.00][.0]";
      this.solicitud.fechaHoraDesmontaje = this.fechaDesmontajeParse + "[.000][.00][.0]";
    }
  }

  /**
   * metodo que busca en el array de usuarios normales su endpoint
   * @param idUserNormal string que contiene el id del usuario normal
   */
  buscarUserNormal(idUserNormal: string): void {
    this.usuariosNormales.forEach(u => {
      if (u.idUsuario == idUserNormal) {
        this.urlUsuarioNormal = u.url;
      }
    });
  }

  /**
   * método que actualiza datos
   */
  actualizarDatos(): void {
    this.actualizarFechas();
    this.codTipoFormSeleccionado == "1" ? this.solicitud.conMunTrazadoraIluminanteFumigena = this.isConMunTrazIluFumig : "";
    if (this.isAdministrador) {
      //si el usuario logeado es administrador puede cambiar el estado de una solicitud
      this.solicitud.estado = this.estadoSeleccionado;
      //buscar el usuario normal de la solicitud y asigna su endpoint
      this.buscarUserNormal(this.solicitud.usuarioNormal.idUsuario);
    }
    if (this.isUsuarioNormal) {
      //asigna el endpoint del usuario normal que ha realizado la solicitud
      this.buscarUserNormal(this.idUser);
    }
    if (this.isGestor) {
      //buscar el usuario normal de la solicitud y asigna su endpoint
      this.buscarUserNormal(this.solicitud.usuarioNormal.idUsuario);
    }
    this.solicitud.usuarioNormal = this.urlUsuarioNormal;
    //asigna el endopint del recurso seleccionado en la solicitud
    this.solicitud.recurso = this.uRlRecursoSeleccionado;
  }

  /**
   * método que crea una solicitud con los datos del formulario y redirecciona a 
   * la página de solicitudes de recursos
   */
  create(): void {
    this.actualizarDatos();
    this.solicitudService.create(this.solicitud).subscribe((response) => {
      this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
    });
  }

  /**
   * método que borra una solicitud, solicitando previamente confirmación
   */
  borrarSolicitud(): void {
    if (confirm('Va a eliminar una Solicitud, ¿Está seguro?')) {
      this.solicitudService.delete(this.solicitud).subscribe((response) => {
        this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
      });
    }
  }

  /**
   * método que se ejecuta al hacer click sobre el botón Actualizar
   * actualiza los datos del formulario y solicita confirmación para tramitar 
   * la solicitud
   * en caso afirmativo, cambia el estado y redirecciona a la paǵina de 
   * solicitudes de recursos
   */
  actualizar(): void {
    this.actualizarDatos();
    if (this.isAdministrador && !this.isValidada && this.estadoSeleccionado != "Validada") {
      if (confirm('¿Validar la Solicitud?')) {
        this.solicitud.estado = "Validada";
      }
    }
    if (this.isUsuarioNormal) {
      if (confirm('¿Tramitar la Solicitud?')) {
        this.solicitud.estado = "Solicitada";
      }
    }
    this.solicitudService.update(this.idSolicitud, this.solicitud).subscribe((response) => {
      if (this.estadoAnterior !== this.estadoSeleccionado) {
        this.solicitudService.enviarNotificacionCambioDeEstado(this.solicitud).subscribe();
      }
      this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
    });
  }


  /**
   * método que se ejecuta al hacer click sobre el botón Tramitar Solicitud
   * cambia el estado de dicha solicitud a Solicitada y solicita confirmación para guardar los cambios
   * en caso afirmativo actualiza los datos y posteriormente los guarda y redirecciona a la página de
   * solicitudes de recursos   * 
   */
  tramitarSolicitud(): void {
    this.solicitud.estado = "Solicitada";
    this.actualizarDatos();
    this.solicitudService.update(this.idSolicitud, this.solicitud).subscribe((response) => {
      this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
    });
  }


  /**
   * método que se ejecuta al hacer click sobre el botón Validar Solicitud
   * cambia el estado de la solicitud (Solicitada, Rechazada, Cancelada) a Validada
   */
  validarSolicitud(): void {
    this.actualizarDatos();
    this.solicitud.estado = "Validada";
    this.solicitudService.update(this.idSolicitud, this.solicitud).subscribe((response) => {
      this.router.navigate([`/principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}`]);
    });
  }


  /**
   * método que se ejecuta cuando se produce un cambio en el input de la fecha del formulario
   * comprueba si la fecha de fin de recurso es menor que la fecha de inicio
   * en caso afirmativo muestra un mensaje por pantalla e inicializa el valor de la fecha   * 
   */
  verificarFechas(): void {
    if (this.cambiarFormatoDate2(this.fechaFinParse) < this.cambiarFormatoDate2(this.fechaInicioParse)) {
      alert('La fecha de FIN debe ser mayor que la de INICIO');
      this.fechaFinParse = "";
    }
  }

  /**
   * metodo que comprueba las fechas de montaje introducidas por el usuario
   */
  verificarFechasMontaje(): void {
    if (this.cambiarFormatoDate2(this.fechaMontajeParse) < this.cambiarFormatoDate2(this.fechaInicioParse)) {
      alert('La fecha de Montaje debe ser mayor que la de INICIO');
      this.fechaMontajeParse = "";
    }
    if (this.cambiarFormatoDate2(this.fechaMontajeParse) > this.cambiarFormatoDate2(this.fechaFinParse)) {
      alert('La fecha de Montaje debe ser menor que la de FIN');
      this.fechaMontajeParse = "";
    }
    if (this.cambiarFormatoDate2(this.fechaDesmontajeParse) < this.cambiarFormatoDate2(this.fechaMontajeParse)) {
      alert('La fecha de Desmontaje debe ser mayor que la de Montaje');
      this.fechaDesmontajeParse = "";
    }
    if (this.cambiarFormatoDate2(this.fechaDesmontajeParse) > this.cambiarFormatoDate2(this.fechaFinParse)) {
      alert('La fecha de Desmontaje debe ser menor que la de FIN');
      this.fechaDesmontajeParse = "";
    }
  }

  /**
   * método que recibe un parámetro Date y lo transforma a un Date con formato yyyy-MM-dd HH:mm:ss
   * @param date variable tipo Date
   * @returns Date
   */
  cambiarFormatoDate(date: Date): Date {
    let stringDate = this.miDatePipe.transform(date, 'dd-MM-yyyy HH:mm:ss');
    let arrayDate: any[] = stringDate.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }

  /**
   * método que recibe un parámetro Date y lo transforma a un Date con formato yyyy-MM-dd
   * @param date variable tipo Date
   * @returns Date
   */
  cambiarFormatoDatesinHora(date: Date): Date {
    let stringDate = this.miDatePipe.transform(date, 'dd-MM-yyyy');
    let arrayDate: any[] = stringDate.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    return fechaDate;
  }

  /**
   * método que recibe un parámetro string y lo transforma a un Date con formato yyyy-MM-dd HH:mm:ss
   * @param date variable tipo Date
   * @returns Date
   */
  cambiarFormatoDate2(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0], arrayDate[3], arrayDate[4], arrayDate[5]);
    return fechaDate;
  }

  /**
   * método que recibe un parámetro string y lo transforma a un Date con formato yyyy-MM-dd
   * @param date variable tipo string
   * @returns Date
   */
  cambiarFormatoDate2sinHora(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    return fechaDate;
  }

  /**
   * método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd
   * @param date variable tipo string
   * @returns string
   */
  cambiarFormatoDateStringsinHora(date: string): string {
    let stringDate = this.miDatePipe.transform(date, 'yyyy-MM-dd');
    return stringDate;
  }

  /**
   * método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd HH:mm:ss
   * @param fecha variable tipo string
   * @returns string
   */
  actualizarFechaInv2(fecha: string): string {
    let fechaActualizadaInv = fecha.slice(0, 2) + "-" + fecha.slice(3, 5) + "-" + fecha.slice(6, 10) + " " + fecha.slice(11, 13) + ":" + fecha.slice(14, 16) + ":" + fecha.slice(17, 19);
    return fechaActualizadaInv;
  }

  /**
   * método que recibe un parámetro string y lo transforma a un string con formato yyyy-MM-dd
   * @param fecha variable tipo string
   * @returns string
   */
  actualizarFechaInv(fecha: string): string {
    let fechaActualizadaInv = fecha.slice(6, 10) + "-" + fecha.slice(3, 5) + "-" + fecha.slice(0, 2);
    return fechaActualizadaInv;
  }

  /**
   * método que recibe como parámetro string la fecha de la solicitud y lo transforma a un string con formato dd-MM-yyyy 00:00:00
   * @param fecha variable tipo string
   * @returns string
   */
  actualizarFechaSolicitud(fecha: string): string {
    let fechaActualizada = fecha.slice(8, 11) + "-" + fecha.slice(5, 7) + "-" + fecha.slice(0, 4) + " 00:00:00";
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
  }


  /**
   * metodo que filtra del array de solicitudes todas las que cumplen que sean del mismo recurso
   * que el de la solicitud que estoy consultando, que sean Validadas y que la fecha de inicio del recurso solicitado
   * esté comprendido entre las fecha de inicio y fin del recurso validado
   */
  comprobarDisponibilidad(): void {
    this.solicitudesDisponibilidadCenad = [];
    this.solicitudesDisponibilidadCenad = this.solicitudesCenad.filter(s => this.cambiarFormatoDate2(s.fechaHoraInicioRecurso) <= this.cambiarFormatoDate2(this.solicitud.fechaHoraInicioRecurso)
      && this.cambiarFormatoDate2(s.fechaHoraFinRecurso) >= this.cambiarFormatoDate2(this.solicitud.fechaHoraInicioRecurso) && s.estado == "Validada" && s.recurso.idRecurso == this.solicitud.recurso.idRecurso).sort(function (a, b): number {
        let resultado: number = 0;
        if (a.usuarioNormal.unidad.nombre == b.usuarioNormal.unidad.nombre) {
          a.fechaSolicitud > b.fechaSolicitud ? resultado = 1 : a.fechaSolicitud < b.fechaSolicitud ? resultado = -1 : resultado = 0;
        } else {
          a.usuarioNormal.unidad.nombre > b.usuarioNormal.unidad.nombre ? resultado = 1 : resultado = -1;
        }
        return resultado;
      });
  }

  /**
   * metodo que se ejecuta al seleccionar un recurso
   * y filtra los campos adicionales según el tipo de formulario
   */
  filtrarTipoFormulario(): void {
    this.resetearVariables();
    //boton = true -> Creacion
    if (this.boton === false) { //edicion solicitudRecurso
      this.codTipoFormSeleccionado = this.solicitud.recurso.tipoFormulario.codTipo;
    } else { //creación solicitudRecurso
      // console.log('urlrecurso', this.uRlRecursoSeleccionado);
      this.solicitudService.getRecursoUrl(this.uRlRecursoSeleccionado).subscribe((response) => {
        this.recurso = this.solicitudService.mapearRecurso(response);
        setTimeout(() => {
          this.codTipoFormSeleccionado = this.recurso.tipoFormulario.codTipo;
          this.solicitud.otrosDatosEspecificos = this.recurso.datosEspecificosSolicitud;
          //console.log('codtipoform', this.codTipoFormSeleccionado);        
        }, 700);

      });
    }
    setTimeout(() => {
      switch (this.codTipoFormSeleccionado.toString()) {
        case "1":
          this.isZonaCaida = true;
          break;
        case "2":
          this.isCTcarros = true;
          break;
        case "3":
          this.isCTlaser = true;
          break;
        case "4":
          this.isCampoTiro = true;
          break;
        case "5":
          this.isCampoExplosivos = true;
          break;
        case "6":
          this.isZonaRestringida = true;
          break;
        case "7":
          this.isAcanVivac = true;
          break;
        case "8":
          this.isZonaVidaBon = true;
          break;
        case "9":
          this.isLavaderos = true;
          break;
        case "10":
          this.isSimulacionRealLaser = true;
          break;
        case "11":
          this.isOtros = true;
          break;
        case "12":
          this.isZonaEspera = true;
          break;

        default: "";
          break;
      }

    }, 900);

  }

  /**
   * metodo que habilita el formulario para crear un arma Zona Caida
   */
  mostrarNuevaArma() {
    this.nuevaArma = true;
  }

  /**
   * metodo que crea una nueva arma en la zona de caida
   */
  crearArma(): void {
    //si la solicitud no ha sido creada 
    if (!this.solicitud.idSolicitud) {
      alert('Se va a crear una solicitud Borrador, para guardar los cambios, sólo tiene que ACTUALIZAR');
      //crea una solicitud
      this.actualizarDatos();
      this.solicitudService.create(this.solicitud).subscribe((response) => {
       // console.log(response);
        //this.isSolicitudCreada = true;
      });
      setTimeout(() => {
        this.solicitudService.getSolicitudesDeCenad(this.idCenad).subscribe((response) => {
          this.solicitudesCenadTrabajo = this.solicitudService.extraerSolicitudes(response);
         // console.log(response);
          setTimeout(() => {
            this.solicitudesCenadTrabajo.sort((a, b) => {
              return (Number(a.idSolicitud) > Number(b.idSolicitud) ? 1 : (Number(a.idSolicitud) < Number(b.idSolicitud) ? -1 : 0));
            });
         //   console.log('this.solicitudesCenadTrabajo', this.solicitudesCenadTrabajo);
            if (this.solicitudesCenadTrabajo[this.solicitudesCenadTrabajo.length - 1].estado == "Borrador"
              && this.solicitudesCenadTrabajo[this.solicitudesCenadTrabajo.length - 1].unidadUsuaria == this.solicitud.unidadUsuaria
              && this.solicitudesCenadTrabajo[this.solicitudesCenadTrabajo.length - 1].jefeUnidadUsuaria == this.solicitud.jefeUnidadUsuaria) {
             // console.log('ultima solicitud url', this.solicitudesCenadTrabajo[this.solicitudesCenadTrabajo.length - 1].url);
              this.solicitudArma.solicitud = this.solicitudesCenadTrabajo[this.solicitudesCenadTrabajo.length - 1].url;
              this.idSolicitud = this.solicitudesCenadTrabajo[this.solicitudesCenadTrabajo.length - 1].idSolicitud;
              this.solicitud = this.solicitudesCenadTrabajo[this.solicitudesCenadTrabajo.length - 1];
             // console.log('solicitud creada', this.solicitud);
            }
          }, 800);
        });
      }, 500);

    } else {//si se está editando la solicitud
      this.solicitudService.getSolicitud(this.idSolicitud).subscribe((response) => {
        this.solicitudArma.solicitud = this.solicitudService.mapearSolicitud(response).url;
      });
    }
    this.armas.forEach(a => {
      a.idArma.toString() == this.idArmaSeleccionada ? this.solicitudArma.arma = a.url.toString() : "";
    });
    setTimeout(() => {
     // console.log('solicitudArma.solicitud', this.solicitudArma.solicitud);
     // console.log('this.idsolicitud', this.idSolicitud);
      this.solicitudService.createSolicitudArma(this.solicitudArma).subscribe((response) => {
     //   console.log(response);
      });
      setTimeout(() => {
        //cierra el formulario de crear arma y resetea la variable
        SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud.push(this.solicitudArma);
        this.solicitudesArmas = SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud;
       // console.log('this.solicitudesArmas', this.solicitudesArmas);
        this.solicitudArma = new SolicitudArmaImpl();
        this.nuevaArma = false;
        //para ocultar el boton de crear solicitud
        this.boton = false;
      }, 700);
    }, 1500);
  }

  /**
   * metodo que obtiene la solicitudArma que se quiere editar
   * @param solicitudArma 
   */
  verDatos(solicitudArma: SolicitudArma): void {
    this.solicitudArmaVerDatos = solicitudArma;
  }

  /**
   * metodo que obtiene el objeto arma que quiere editar
   * @param arma 
   */
  verDatosArma(arma: Arma): void {
    this.armaVerDatos = arma;
  }

  /**
   * metodo que actualiza un arma
   * @param arma 
   */
  onArmaActualizada(arma: ArmaImpl): void {
    this.armaActualizada = arma;
  }

  /**
   * metodo que actualiza una solicitudArma
   * @param solicitudArma 
   */
  onSolicitudArmaActualizar(solicitudArma: SolicitudArmaImpl): void {
    if (solicitudArma.idSolicitudArma) {
      solicitudArma.arma = this.armaActualizada.url;
      console.log('this.urlArmaSeleccionada', this.armaActualizada.url);
      this.solicitudService.updateSolicitudArma(solicitudArma).subscribe((response) => {
        console.log(response);
        //actualiza la variable estática que contiene el array de solicitudArma
        SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud.forEach(s => {
          if (s.idSolicitudArma === solicitudArma.idSolicitudArma) {
            s = solicitudArma;
          }
        });
        this.ngOnInit();
      });
    }
  }

  /**
   * metodo que borra una solicitud arma
   * @param solicitudArma 
   */
  onSolicitudArmaEliminar(solicitudArma: SolicitudArmaImpl): void {
    if (solicitudArma.idSolicitudArma) {
      //elimina de la variable estática la solicitud arma que se ha eliminado
      SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud = SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud.filter(s => {
        s.idSolicitudArma != solicitudArma.idSolicitudArma;
      });
      console.log('estatica', SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud);
      this.solicitudService.deleteSolicitudArma(solicitudArma).subscribe((response) => {
        //se crean instancias de los objetos para inicializar sus valores y el modal se actualice
        this.solicitudArma = new SolicitudArmaImpl();
        // this.arma = new ArmaImpl();
        this.ngOnInit();
      });
    }
  }

  /**
   * método que recorre el array de armas, selecciona el arma por su id, y asigna 
   * su valor del tipo de tiro a la variable tipoTiroSeleccionado 
   */
  mostrarTipoTiro(): void {
    this.armas.forEach(a => {
      a.idArma === this.idArmaSeleccionada ? this.tipoTiroSeleccionado = a.tipoTiro : "";
    });
  }

  /**
   * método que obtiene todas las solicitudesArmas y filtra las que sean de la solicitud
   */
  getSolicitudesArmasdeSolicitud(): void {
    this.solicitudService.getSolicitudesArmasDeSolicitud(this.solicitud.idSolicitud).subscribe((response) => {
      SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud = this.solicitudService.extraerSolicitudesArmas(response);
      //console.log('this.solicitudesArmas', this.solicitudesArmas);
    });
    setTimeout(() => {
      this.solicitudesArmas = SolicitudRecursoFormComponent.solicitudesArmasZCdeSolicitud;
    }, 700);
  }

  /**
   * metodo que habilita el formulario para crear un fichero para el Cenad
   */
  mostrarNuevoFicheroCenad(): void {
    this.nuevoFicheroCenad = true;
  }

  /**
   * metodo que habilita el formulario para crear un fichero para la Unidad
   */
  mostrarNuevoFicheroUnidad(): void {
    this.nuevoFicheroUnidad = true;
  }

  /**
   * metodo para crear un nuevo fichero
   */
  crearFichero(): void {
    this.solicitudService.getSolicitud(this.idSolicitud).subscribe((response) => {
      if (this.isGestor) {
        this.fichero.solicitudRecursoCenad = this.solicitudService.mapearSolicitud(response).url;
      }
      if (this.isUsuarioNormal) {
        this.fichero.solicitudRecursoUnidad = this.solicitudService.mapearSolicitud(response).url;
      }
    });

    //sube el archivo
    this.upload();
    //asigna el nombre del mismo al campo del fichero
    this.fichero.nombreArchivo = this.currentFile.name;
    //compruebo que el archivo se sube antes de crear el fichero
    if (this.archivoSubido) {
      //crea el fichero propiamente dicho
      this.recursoService.createFichero(this.fichero).subscribe((response) => {
       // console.log(response);
        console.log(`He creado el fichero ${this.fichero.nombre}`);
        if (this.isGestor) {
          //actualiza el [] con los ficheros de la solicitud
          this.recursoService.getFicherosSolicitudCenad(this.idSolicitud).subscribe((response) =>
            this.ficherosCenad = this.recursoService.extraerFicheros(response));
        }
        if (this.isUsuarioNormal) {
          //actualiza el [] con los ficheros de la solicitud          
          this.recursoService.getFicherosSolicitudUnidad(this.idSolicitud).subscribe((response) =>
            this.ficherosUnidad = this.recursoService.extraerFicheros(response));
        }
      });
    }
    setTimeout(() => {
      //para ocultar el boton de crear solicitud
      this.boton = false;
      //cierra el formulario de crear fichero y resetea la variable
      this.nuevoFicheroCenad = false;
      this.nuevoFicheroUnidad = false;
      this.fichero = new FicheroImpl();
      if (this.isGestor) {
        this.fichero.solicitudRecursoCenad = this.appConfigService.hostSicenad ? `${this.appConfigService.hostSicenad}solicitudes/${this.solicitud.idSolicitud}/` : `${environment.hostSicenad}solicitudes/${this.solicitud.idSolicitud}`;
      }
      if (this.isUsuarioNormal) {
        this.fichero.solicitudRecursoUnidad = this.appConfigService.hostSicenad ? `${this.appConfigService.hostSicenad}solicitudes/${this.solicitud.idSolicitud}/` : `${environment.hostSicenad}solicitudes/${this.solicitud.idSolicitud}`;
      }
    }, 800);
  }

  /**
   * metodo para eliminar un fichero
   * @param fichero 
   */
  onEliminarFichero(fichero: FicheroImpl): void {
    this.recursoService.deleteFichero(fichero).subscribe(response => {
      console.log(`He eliminado el fichero ${fichero.nombre}`);
      //actualiza el [] con los ficheros del recurso
      if (this.isGestor) {
        this.recursoService.getFicherosSolicitudCenad(this.idSolicitud).subscribe((response) =>
          this.ficherosCenad = this.recursoService.extraerFicheros(response));
      }
      if (this.isUsuarioNormal) {
        this.recursoService.getFicherosSolicitudUnidad(this.idSolicitud).subscribe((response) =>
          this.ficherosUnidad = this.recursoService.extraerFicheros(response));
      }
    });
  }

  /**
   * metodo para seleccionar el archivo a subir
   * @param event fichero
   */
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  /**
   * metodo para subir un archivo
   */
  upload(): void {
    this.currentFile = this.selectedFiles.item(0);
    //compruebo si es imagen para aplicarle el tamaño maximo de imagen o el de docRecurso
    if (this.currentFile.type.includes("image")) {//si supera el tamaño archivoSubido sera false, y no se creara el fichero
      this.archivoSubido = (this.currentFile.size > this.sizeMaxEscudo * 1024 * 1024) ? false : true;//debo pasarlo a bytes
    } else {
      this.archivoSubido = (this.currentFile.size > this.sizeMaxDocSolicitud * 1024 * 1024) ? false : true;
    }
    this.recursoService.uploadSolicitud(this.currentFile, this.solicitud.idSolicitud).subscribe();
    this.selectedFiles = undefined;
  }

  /**
   * metodo para construir la url del archivo a mostrar o descargar
   * @param nombreArchivo string
   * @returns string
   */
  pathArchivo(nombreArchivo: string): string {
    const pathImg: string = `${this.pathRelativo}${nombreArchivo}`;
    return pathImg;
  }

  /**
   * metodo para traspasar los datos del fichero
   * @param fichero 
   */
  verDatosFichero(fichero: FicheroImpl): void {
    this.ficheroVerDatos = fichero;
  }

  /**
   * metodo para editar un fichero
   * @param fichero 
   */
  onFicheroEditar(fichero: FicheroImpl): void {
    this.recursoService.updateFichero(fichero).subscribe(response => {
      console.log(`He actualizado el fichero ${fichero.nombre}`);
      //actualiza el [] con los ficheros del recurso
      if (this.isGestor) {
        this.recursoService.getFicherosSolicitudCenad(this.idSolicitud).subscribe((response) =>
          this.ficherosCenad = this.recursoService.extraerFicheros(response));
      }
      if (this.isUsuarioNormal) {
        this.recursoService.getFicherosSolicitudUnidad(this.idSolicitud).subscribe((response) =>
          this.ficherosUnidad = this.recursoService.extraerFicheros(response));
      }
    });
  }
}