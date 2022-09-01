import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaLoggingAdministrador } from '../logging/canActivateViaLoggingAdministrador';
import { CanActivateViaLoggingLogeado } from '../logging/canActivateViaLoggingLogeado';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { ShellPrincipalComponent } from './shell-principal/shell-principal.component';

const routes: Routes = [
  {
    path: '',
    component: ShellPrincipalComponent,
    children: [
      {
        /**
         * pagina principal de cada cenad, sin necesidad de estar logged
         */
        path: '',
        component: HomePrincipalComponent
      },
      {
        /**
         * listado de categorias de cada cenad, si estas logged como administrador
         */
        path: 'categorias/:idCenad',
        loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule),
        canActivateChild: [CanActivateViaLoggingAdministrador]
      },
      {
        /**
         * listado de recursos de cada cenad, si estas logged como administrador
         */
        path: 'recursos/:idCenad',
        loadChildren: () => import('../recursos/recursos.module').then(m => m.RecursosModule),
        canActivateChild: [CanActivateViaLoggingAdministrador]
      },
      {
        /**
         * listado de recursos de cada cenad (gestor/usuario), sin necesidad de estar logged
         */
        path: 'consultaRecursos/:idCenad',
        loadChildren: () => import('../consultaRecursos/consultaRecursos.module').then(m => m.ConsultaRecursosModule)
      },
      {
        /**
         * listado de gestores/usuarios normal de cada cenad, si estas logged como administrador
         */
        path: 'usuarios/:idCenad',
        loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule),
        canActivateChild: [CanActivateViaLoggingAdministrador]
      },
      {
        /**
         * listado de unidades, si estas logged como administrador
         */
        path: 'unidades/:idCenad',
        loadChildren: () => import('../unidades/unidades.module').then(m => m.UnidadesModule),
        canActivateChild: [CanActivateViaLoggingAdministrador]
      },
      {
        /**
         * listado de solicitudes de los recursos de un cenad (administrador/gestor/usuario_normal)
         */
        path: 'solicitudesRecursos/:idCenad',
        loadChildren: () => import('../solicitudes-recursos/solicitudes-recursos.module').then(m => m.SolicitudesRecursosModule),
        canActivateChild: [CanActivateViaLoggingLogeado]
      },
      {
        /**
         * listado de cartografias de cada cenad
         */
        path: 'cartografias/:idCenad',
        loadChildren: () => import('../cartografias/cartografias.module').then(m => m.CartografiasModule)
      },
      {
        /**
         * Informacion basica de cada cenad
         */
        path: 'infoCenad/:idCenad',
        loadChildren: () => import('../infoCenad/infoCenad.module').then(m => m.InfoCenadModule)
      },
      {
        /**
         * Normativa de cada cenad
         */
        path: 'normativas/:idCenad',
        loadChildren: () => import('../normativas/normativas.module').then(m => m.NormativasModule)
      },
      {
        /**
         * calendario de solicitudes de cada cenad
         */
        path: 'calendarios/:idCenad',
        loadChildren: () => import('../calendarios/calendarios.module').then(m => m.CalendariosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalCenadRoutingModule { }
