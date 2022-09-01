import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { CanActivateViaLoggingSuperadministrador } from "./logging/canActivateViaLoggingSuperadministrador";

const routes: Routes = [
  {
    /**
     * mostrara el Home de la aplicacion, con el mapa para seleccionar cenad, sin necesidad de estar logged
     */
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    /**
     * mostrara la pagina principal de cada cenad, sin necesidad de estar logged
     */
    path: "principalCenad/:idCenad",
    loadChildren: () =>
      import("./principal-cenad/principal-cenad.module").then(
        (m) => m.PrincipalCenadModule
      ),
  },
  {
    /**
     * mostrara el modulo de superadministrador, si estas logged como superadministrador
     */
    path: "superadministrador",
    loadChildren: () =>
      import("./superadministrador/superadministrador.module").then(
        (m) => m.SuperadministradorModule
      ),
    canActivateChild: [CanActivateViaLoggingSuperadministrador],
  },
  {
    /**
     * mostrara el modulo de tipos de formulario, si estas logged como superadministrador
     */
    path: "tiposFormulario",
    loadChildren: () =>
      import("./tiposFormulario/tiposFormulario.module").then(
        (m) => m.TiposFormularioModule
      ),
    canActivateChild: [CanActivateViaLoggingSuperadministrador],
  },
  {
    /**
     * mostrara el modulo de categorias de fichero, si estas logged como superadministrador
     */
    path: "categoriasFichero",
    loadChildren: () =>
      import("./categoriasFichero/categoriasFichero.module").then(
        (m) => m.CategoriasFicheroModule
      ),
    canActivateChild: [CanActivateViaLoggingSuperadministrador],
  },
  {
    /**
     * mostrara el modulo de unidades, si estas logged como superadministrador. los administradores usan otra ruta
     */
    path: "unidades",
    loadChildren: () =>
      import("./unidades/unidades.module").then((m) => m.UnidadesModule),
    canActivateChild: [CanActivateViaLoggingSuperadministrador],
  },
  {
    /**
     * mostrara el modulo de usuarios, si estas logged como superadministrador. los administradores usan otra ruta
     */
    path: "usuarios",
    loadChildren: () =>
      import("./usuarios/usuarios.module").then((m) => m.UsuariosModule),
    canActivateChild: [CanActivateViaLoggingSuperadministrador],
  },
  {
    /**
     * mostrara el modulo de armas, si estas logged como superadministrador
     */
    path: "armas",
    loadChildren: () =>
      import("./armas/armas.module").then((m) => m.ArmasModule),
    canActivateChild: [CanActivateViaLoggingSuperadministrador],
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
