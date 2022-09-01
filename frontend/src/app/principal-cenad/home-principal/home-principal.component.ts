import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdge } from '@fortawesome/free-brands-svg-icons';
import { faBusinessTime, faCalendarAlt, faFolderOpen, faLink, faMap } from '@fortawesome/free-solid-svg-icons';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadImpl } from 'src/app/superadministrador/models/cenad-impl';
import { environment } from 'src/environments/environment';
import { PrincipalService } from '../service/principal.service';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit {
  /**
   * variable icono
   */
  faRecurso = faFolderOpen;
  /**
 * variable icono
 */
  faConsultar = faEdge;
  /**
 * variable icono
 */
  faCalendario = faCalendarAlt;
  /**
 * variable icono
 */
  faSolicitar = faBusinessTime;
  /**
 * variable icono
 */
  faEnlace = faLink;
  /**
 * variable icono
 */
  faCartografia = faMap;
  /**
   * variable que almacena si un usuario está logeado
   */
  isLogeado: boolean = false;
  /**
   * variable que almacena si un usuario normal está logeado
   */
  isUserNormal: boolean = false;
  /**
   * variable que almacena si un usuario superadministrador está logeado
   */
  isSuperAdmin: boolean = false;
  /**
   * variable que representa el cenad
   */
  cenad: Cenad = new CenadImpl();
  /**
   * variable para el id del CENAD (barra de navegacion)
   */
  idCenad: string = "";
  /**
   * variable para el id de la Solicitud (barra de navegación). Con este valor entrará en el formulario en modo Creación
   */
  idSolicitud: string = "";
  /**
   * variable para almacenar el nombre del campo escudo del cenad y construir la url
   */
  escudoCenad: string = "";
  /**
   * variable para el path relativo del archivo del escudo
   */
  pathRelativo: string = `${environment.hostSicenad}files/escudos/`;
  /**
   * variable para la url del archivo del escudo
   */
  pathImg: string = "";

  /**
   *
   * @param principalService Para usar los metodos propios de Principal
   * @param activateRoute Para capturar el id de la barra de navegacion
   * @param appConfigService Para usar las variables del `properties`
   */
  constructor(private principalService: PrincipalService, private activateRoute: ActivatedRoute, private appConfigService: AppConfigService) {
    this.pathRelativo = appConfigService.hostSicenad ? `${appConfigService.hostSicenad}files/escudos/` : `${environment.hostSicenad}files/escudos/`;
  }

  /**
   * Carga el CENAD y comprueba si el usuario esta logueado
   */
  ngOnInit() {
    this.cargarCenad();
    this.comprobarLogin();
  }

  /**
   * metodo que comprueba si el usuario está logeado
   */
  comprobarLogin(): void {
    if (sessionStorage.isNormal == "true") {
      this.isUserNormal = true;
    }
    if (sessionStorage.isSuperAdmin == "true") {
      this.isSuperAdmin = true;
    }
  }

  /**
   * metodo que captura el idCenad de la barra de navegación
   */
  capturarIdBarraNavegacion(): void {
    this.idCenad = this.activateRoute.snapshot.params['idCenad'];
  }

  /**
   * carga el CENAD/CMT cuyo id esta en la barra de navegación en su variable, construyendo la ruta del archivo
   */
  cargarCenad(): void {
    this.capturarIdBarraNavegacion();
    this.principalService.getCenad(this.idCenad).subscribe(response => {
      this.cenad = this.principalService.mapearCenad(response);
      this.escudoCenad = this.cenad.escudo;
      this.pathImg = `${this.pathRelativo}${this.escudoCenad}`;
    });
  }

  /**
   * metodo que muestra un mensaje
   */
  mensaje(): void {
    alert('Debe Identificarse como Usuario Normal para acceder a esta opción....');
  }
}
