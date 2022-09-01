import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArmaService } from 'src/app/armas/service/arma.service';
import { CategoriaFicheroService } from 'src/app/categoriasFichero/service/categoriaFichero.service';
import { Cenad } from 'src/app/superadministrador/models/cenad';
import { CenadService } from 'src/app/superadministrador/service/cenad.service';
import { TipoFormularioService } from 'src/app/tiposFormulario/service/tipoFormulario.service';
import { UnidadService } from 'src/app/unidades/service/unidad.service';
import { UsuarioAdministradorService } from 'src/app/usuarios/service/usuarioAdministrador.service';
import { UsuarioGestorService } from 'src/app/usuarios/service/usuarioGestor.service';
import { UsuarioNormalService } from 'src/app/usuarios/service/usuarioNormal.service';
import { UsuarioSuperadministradorService } from 'src/app/usuarios/service/usuarioSuperadministrador.service';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inicio: boolean = true;
  /**
   * variable para la seleccion de la provincia (id)
   */
  idProvinciaSeleccionada: number;
  /**
   * variable para la seleccion de la provincia (nombre)
   */
  provinciaSeleccionada: string = "";
  /**
   * variable que recoge todos los cenads
   */
  cenads: Cenad[] = [];
  /**
   * variable que contendra los cenads de la provincia seleccionada
   */
  cenadsFiltro: Cenad[] = [];
  /**
   * [ ] que contiene todas las provincias
   */
  provincias = [{idProvincia:15, nombre:"A CORUÑA"}, {idProvincia:1, nombre:"ALAVA"}, {idProvincia:2, nombre:"ALBACETE"},
  {idProvincia:3, nombre:"ALICANTE"}, {idProvincia:4, nombre:"ALMERIA"}, {idProvincia:33, nombre:"ASTURIAS"},
  {idProvincia:5, nombre:"AVILA"}, {idProvincia:6, nombre:"BADAJOZ"}, {idProvincia:8, nombre:"BARCELONA"},
  {idProvincia:9, nombre:"BURGOS"}, {idProvincia:10, nombre:"CACERES"}, {idProvincia:11, nombre:"CADIZ"},
  {idProvincia:39, nombre:"CANTABRIA"}, {idProvincia:12, nombre:"CASTELLON"}, {idProvincia:51, nombre:"CEUTA"},
  {idProvincia:13, nombre:"CIUDAD REAL"}, {idProvincia:14, nombre:"CORDOBA"}, {idProvincia:16, nombre:"CUENCA"},
  {idProvincia:17, nombre:"GERONA"}, {idProvincia:18, nombre:"GRANADA"}, {idProvincia:19, nombre:"GUADALAJARA"},
  {idProvincia:20, nombre:"GUIPUZCOA"}, {idProvincia:21, nombre:"HUELVA"}, {idProvincia:22, nombre:"HUESCA"},
  {idProvincia:7, nombre:"ISLAS BALEARES"}, {idProvincia:23, nombre:"JAEN"}, {idProvincia:26, nombre:"LA RIOJA"},
  {idProvincia:24, nombre:"LEON"}, {idProvincia:25, nombre:"LERIDA"}, {idProvincia:27, nombre:"LUGO"},
  {idProvincia:28, nombre:"MADRID"}, {idProvincia:29, nombre:"MALAGA"}, {idProvincia:52, nombre:"MELILLA"},
  {idProvincia:30, nombre:"MURCIA"}, {idProvincia:31, nombre:"NAVARRA"}, {idProvincia:32, nombre:"OURENSE"},
  {idProvincia:34, nombre:"PALENCIA"}, {idProvincia:35, nombre:"LAS PALMAS"}, {idProvincia:36, nombre:"PONTEVEDRA"},
  {idProvincia:37, nombre:"SALAMANCA"}, {idProvincia:40, nombre:"SEGOVIA"}, {idProvincia:41, nombre:"SEVILLA"},
  {idProvincia:42, nombre:"SORIA"}, {idProvincia:38, nombre:"STA CRUZ TENERIFE"}, {idProvincia:43, nombre:"TARRAGONA"},
  {idProvincia:44, nombre:"TERUEL"}, {idProvincia:45, nombre:"TOLEDO"}, {idProvincia:46, nombre:"VALENCIA"},
  {idProvincia:47, nombre:"VALLADOLID"}, {idProvincia:48, nombre:"VIZCAYA"}, {idProvincia:49, nombre:"ZAMORA"},
  {idProvincia:50, nombre:"ZARAGOZA"}];

  /**
   *
   * @param homeService Para usar los metodos propios de Home
   * @param router Para redirigir
   * @param usuarioSuperadministradorService Para usar los metodos propios de Usuario Superadministrador
   * @param usuarioAdministradorService Para usar los metodos propios de Usuario administrador
   * @param usuarioGestorService Para usar los metodos propios de Usuario Gestor
   * @param usuarioNormalService Para usar los metodos propios de Usuario Normal
   * @param cenadService Para usar los metodos propios de Cenad
   * @param categoriaFicheroService Para usar los metodos propios de Categoria de Fichero
   * @param tipoFormularioService Para usar los metodos propios de Tipo de Formulario
   * @param unidadService Para usar los metodos propios de Unidad
   * @param armaService Para usar los metodos propios de Arma
   */
  constructor(private homeService: HomeService, private router: Router,private usuarioSuperadministradorService: UsuarioSuperadministradorService,
    private usuarioAdministradorService: UsuarioAdministradorService,
    private usuarioGestorService: UsuarioGestorService,
    private usuarioNormalService: UsuarioNormalService,
    private cenadService: CenadService,
    private categoriaFicheroService: CategoriaFicheroService,
    private tipoFormularioService: TipoFormularioService,
    private unidadService: UnidadService,
    private armaService: ArmaService) { }

  /**
   * Recupera los CENADS del Local Storage
   */
  ngOnInit() {
    this.cenads = JSON.parse(localStorage.cenads);
  }

  /**
   * Asigna al array cenadsFiltro todos los CENAD,s/CMT,s de una provincia
   * @param idProvincia Id de la provincia seleccionada
   */
  buscarCenads(idProvincia: number): void {
    this.cenadsFiltro = this.cenads.filter(cenad => {
      if (cenad.provincia == idProvincia) {
        return cenad;
      }
    });
    this.provincias.forEach(p => {
      if (p.idProvincia == idProvincia) {
        this.provinciaSeleccionada = p.nombre;
        this.idProvinciaSeleccionada = p.idProvincia;
      }
    });
  }

  /**
   * Es invocada desde la capa presentación a través del filtro o al hacer click sobre una provincia
   * @param idProvincia Id de la provincia seleccionada
   */
  respuesta(idProvincia: number): void {
    this.inicio = false;
    this.buscarCenads(idProvincia);
  }

  /**
   * metodo que actualiza las variables del LocalStorage
   */
  actualizarLocalStorage(): void {
    localStorage.clear();
    if(!localStorage.usuariosSuperadministrador) {
      this.usuarioSuperadministradorService.getUsuarios().subscribe((response) => localStorage.usuariosSuperadministrador = JSON.stringify(this.usuarioSuperadministradorService.extraerUsuarios(response)));
    }
    if(!localStorage.usuariosAdministrador) {
      this.usuarioAdministradorService.getUsuarios().subscribe((response) => localStorage.usuariosAdministrador = JSON.stringify(this.usuarioAdministradorService.extraerUsuarios(response)));
    }
    if(!localStorage.usuariosGestor) {
      this.usuarioGestorService.getUsuarios().subscribe((response) => localStorage.usuariosGestor = JSON.stringify(this.usuarioGestorService.extraerUsuarios(response)));
    }
    if(!localStorage.usuariosNormal) {
      this.usuarioNormalService.getUsuarios().subscribe((response) => localStorage.usuariosNormal = JSON.stringify(this.usuarioNormalService.extraerUsuarios(response)));
    }
    if(!localStorage.cenads) {
      this.cenadService.getCenads().subscribe((response) => localStorage.cenads = JSON.stringify(this.cenadService.extraerCenads(response)));
    }
    if(!localStorage.categoriasFichero) {
      this.categoriaFicheroService.getCategoriasFichero().subscribe((response) => localStorage.categoriasFichero = JSON.stringify(this.categoriaFicheroService.extraerCategoriasFichero(response)));
    }
    if(!localStorage.tiposFormulario) {
      this.tipoFormularioService.getTiposFormulario().subscribe((response) => localStorage.tiposFormulario = JSON.stringify(this.tipoFormularioService.extraerTiposFormulario(response)));
    }
    if(!localStorage.unidades) {
      this.unidadService.getUnidades().subscribe((response) => localStorage.unidades = JSON.stringify(this.unidadService.extraerUnidades(response)));
    }
    if(!localStorage.armas) {
      this.armaService.getArmas().subscribe((response) => localStorage.armas = JSON.stringify(this.armaService.extraerArmas(response)));
    }
  }
}
