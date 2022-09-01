import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faEdge } from "@fortawesome/free-brands-svg-icons";
import {
  faQuestionCircle,
  faSnowflake,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBomb,
  faBook,
  faBusinessTime,
  faCalendarAlt,
  faCloudSun,
  faEdit,
  faFire,
  faFolderOpen,
  faFolderPlus,
  faGlobe,
  faHome,
  faLink,
  faMap,
  faSearchLocation,
  faSitemap,
  faTree,
  faUserCog,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { CartografiaService } from "src/app/cartografias/service/cartografia.service";
import { CategoriaService } from "src/app/categorias/service/categoria.service";
import { NormativaService } from "src/app/normativas/service/normativa.service";
import { PrincipalService } from "src/app/principal-cenad/service/principal.service";
import { RecursoService } from "src/app/recursos/service/recurso.service";
import { Cenad } from "src/app/superadministrador/models/cenad";
import { CenadImpl } from "src/app/superadministrador/models/cenad-impl";
import { UsuarioAdministrador } from "src/app/usuarios/models/usuarioAdministrador";
import { UsuarioAdministradorImpl } from "src/app/usuarios/models/usuarioAdministrador-impl";
import { UsuarioGestor } from "src/app/usuarios/models/usuarioGestor";
import { UsuarioGestorImpl } from "src/app/usuarios/models/usuarioGestor-impl";
import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";
import { UsuarioNormalImpl } from "src/app/usuarios/models/usuarioNormal-impl";
import { UsuarioGestorService } from "src/app/usuarios/service/usuarioGestor.service";

@Component({
  selector: "app-header-principal",
  templateUrl: "./header-principal.component.html",
  styleUrls: ["./header-principal.component.css"],
})
export class HeaderPrincipalComponent implements OnInit {
  /**
   * variables de icono
   */
  faRecurso = faFolderOpen;
  /**
 * variables de icono
 */
  faConsultar = faEdge;
  /**
 * variables de icono
 */
  faMas = faFolderPlus;
  /**
 * variables de icono
 */
  faCalendario = faCalendarAlt;
  /**
 * variables de icono
 */
  faSolicitar = faBusinessTime;
  /**
 * variables de icono
 */
  faHome = faHome;
  /**
 * variables de icono
 */
  faArtefacto = faBomb;
  /**
 * variables de icono
 */
  faInfo = faQuestionCircle;
  /**
 * variables de icono
 */
  faVista = faSearchLocation;
  /**
 * variables de icono
 */
  faEnlace = faLink;
  /**
 * variables de icono
 */
  faNormativa = faBook;
  /**
 * variables de icono
 */
  faMeteo = faSnowflake;
  /**
 * variables de icono
 */
  faCartografia = faMap;
  /**
 * variables de icono
 */
  faMenu = faBars;
  /**
 * variables de icono
 */
  faUser = faUserCog;
  /**
 * variables de icono
 */
  faPrevision = faCloudSun;
  /**
 * variables de icono
 */
  faIPI = faFire;
  /**
 * variables de icono
 */
  faMetozonas = faGlobe;
  /**
 * variables de icono
 */
  faUsuarios = faUsers;
  /**
 * variables de icono
 */
  faCategorias = faTree;
  /**
 * variables de icono
 */
  faPeticiones = faEdit;
  /**
 * variables de icono
 */
  faUnidades = faSitemap;
  /**
   * variable para mostrar el nombre del cenad
   */
  nombreCenad: string = "";
  /**
   * variable que guarda el cenad seleccionado
   */
  cenad: Cenad = new CenadImpl();
  /**
   * variable para rescatar el id del cenad de la barra de navegacion
   */
  idCenad: string = "";
  /**
   * variable que guarda el id del cenad de la provincia de zaragoza
   */
  idCenadZaragoza: string = "";
  /**
   * variable que indica si el cenad seleccionado es el cenad SG
   */
  isCenadZaragoza: boolean = false;
  /**
   * variable que guarda todos los cenads
   */
  cenads: Cenad[] = [];
  /**
   * variable que indica si el usuario se ha logueado como superadministrador
   */
  isSuperAdmin: boolean = false;
  /**
   * variable que indica si el usuario se ha logueado como Gestor o Normal
   */
  isGestorNormal: boolean = false;
  /**
   * variable que indica si el usuario se ha logueado como Administrador, Gestor o Normal
   */
  isAdminGestorNormal: boolean = false;
  /**
   * variable que indica si el usuario se ha logueado como Administrador de ese Cenad
   */
  isAdminEsteCenad: boolean = false;
  /**
   * variable estática logging admin
   */
  static userAdminLogeado: UsuarioAdministrador = new UsuarioAdministradorImpl();
  /**
 * variable estática logging gestor
 */
  static userGestorLogeado: UsuarioGestor = new UsuarioGestorImpl();
  /**
 * variable estática logging normal
 */
  static userNormalLogeado: UsuarioNormal = new UsuarioNormalImpl();

  /**
   *
   * @param principalService Para usar los metodos propios de Principal
   * @param activateRoute Para capturar el id de la barra de navegacion
   * @param router Para redirigir
   * @param categoriaService Para usar los metodos propios de Categoria
   * @param recursoService Para usar los metodos propios de Recurso
   * @param usuarioGestorService Para usar los metodos propios de UsuarioGestor
   */
  constructor(
    private principalService: PrincipalService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private recursoService: RecursoService,
    private usuarioGestorService: UsuarioGestorService,
    private cartografiaService: CartografiaService,
    private normativaService: NormativaService) { }

  /**
   * - carga el cenad seleccionado
   * - realiza el proceso de carga de todos los CENAD,s/CMT,s y comprueba si el CENAD/CMT seleccionado en el home es el de zaragoza
   * - comprueba si estas loggeado como superadministrador
   * - comprueba si estas loggeado como administrador de este cenad
   * - comprueba si estas loggeado como administrador, gestor o usuario normal
   * - comprueba si estas loggeado como gestor o usuario normal
   * - recupera al local storage las categorias padre, categorias, recursos y gestores de ese cenad
   */
  ngOnInit() {
    this.cargarCenad();
    this.cargarCenads();
    this.isSuperAdmin = sessionStorage.isSuperAdmin === "true";
    this.isAdminEsteCenad =
      this.idCenad === sessionStorage.idCenad &&
      sessionStorage.isAdmin === "true";
    this.isAdminGestorNormal =
      sessionStorage.isAdmin === "true" ||
      sessionStorage.isGestor === "true" ||
      sessionStorage.isNormal === "true";
    this.isGestorNormal =
      sessionStorage.isGestor === "true" || sessionStorage.isNormal === "true";
    if (!localStorage.getItem(`categorias_${this.idCenad}`)) {
      this.categoriaService
        .getCategoriasDeCenad(this.idCenad)
        .subscribe((response) =>
          localStorage.setItem(
            `categorias_${this.idCenad}`,
            JSON.stringify(this.categoriaService.extraerCategorias(response))
          )
        );
    }
    if (!localStorage.getItem(`categoriasPadre_${this.idCenad}`)) {
      this.categoriaService
        .getCategoriasPadreDeCenad(this.idCenad)
        .subscribe((response) =>
          localStorage.setItem(
            `categoriasPadre_${this.idCenad}`,
            JSON.stringify(this.categoriaService.extraerCategorias(response))
          )
        );
    }
    if (!localStorage.getItem(`recursos_${this.idCenad}`)) {
      this.recursoService
        .getRecursosDeCenad(this.idCenad)
        .subscribe((response) =>
          localStorage.setItem(
            `recursos_${this.idCenad}`,
            JSON.stringify(this.recursoService.extraerRecursos(response))
          )
        );
    }
    if(!localStorage.getItem(`usuariosGestor_${this.idCenad}`)) {
      this.usuarioGestorService.getUsuariosGestoresDeCenad(this.idCenad).subscribe((response) => localStorage.setItem(`usuariosGestor_${this.idCenad}`, JSON.stringify(this.usuarioGestorService.extraerUsuarios(response))));
    }
    if(!localStorage.getItem(`cartografias_${this.idCenad}`)) {
      this.cartografiaService.getCartografiasDeCenad(this.idCenad).subscribe((response) => localStorage.setItem(`cartografias_${this.idCenad}`, JSON.stringify(this.cartografiaService.extraerCartografias(response))));
    }
    if(!localStorage.getItem(`normativas_${this.idCenad}`)) {
      this.normativaService.getNormativasDeCenad(this.idCenad).subscribe((response) => localStorage.setItem(`normativas_${this.idCenad}`, JSON.stringify(this.normativaService.extraerNormativas(response))));
    }
  }

  /**
   * Captura el idCenad pasado como parámetro en la barra de navegación
   */
  capturarIdBarraNavegacion(): void {
    this.idCenad = this.activateRoute.snapshot.params["idCenad"];
  }

  /**
   * Rescata de la BD el CENAD/CMT cuyo id es pasado como parámetro desde la barra de navegación
   */
  cargarCenad(): void {
    this.capturarIdBarraNavegacion();
    this.principalService.getCenad(this.idCenad).subscribe((response) => {
      this.cenad = this.principalService.mapearCenad(response);
      this.nombreCenad = this.cenad.nombre;
    });
  }

  /**
   * metodo que carga los diferentes CENAD,s/CMT,s y comprueba si es el de zaragoza, ya que tiene algun enlace especial a mostrar
   */
  cargarCenads(): void {
    this.cenads = JSON.parse(localStorage.cenads);
    this.buscarIdCenadZaragoza();
    this.comprobarCenadZaragoza();
  }

  /**
   * si el idProvincia del CENAD/CMT es el de Zaragoza (50), actualiza el valor de la variable idCenadZaragoza
   */
  buscarIdCenadZaragoza(): void {
    this.cenads.forEach((c) => {
      if (c.provincia == 50) {
        this.idCenadZaragoza = c.idCenad;
      }
    });
  }

  /**
   * Para ocultar menú ampliado de meteorología y vistas ACMT(es especial del CENAD SG)
   */
  comprobarCenadZaragoza(): void {
    if (this.idCenadZaragoza == this.idCenad) {
      this.isCenadZaragoza = true;
    }
  }

  /**
   * va a la home de ese cenad y ejecuta ngOnInit para refresacr si se ha loggeado
   */
  inicioCenad(): void {
    this.router.navigate([`/principalCenad/${this.idCenad}`]);
    this.ngOnInit();
  }
}
