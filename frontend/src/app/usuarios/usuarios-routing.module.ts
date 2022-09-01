import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioAdministradorFormComponent } from './usuariosAdministrador/usuarioAdministrador-form/usuarioAdministrador-form.component';
import { UsuarioGestorFormComponent } from './usuariosGestor/usuarioGestor-form/usuarioGestor-form.component';
import { UsuarioNormalFormComponent } from './usuariosNormal/usuarioNormal-form/usuarioNormal-form.component';

const routes: Routes = [
  {/**
    * muestra la pantalla inicial del superadministrador
    */
    path: '',
    component: UsuariosComponent
  },
  {/**
    * para crear un administrador
    */
    path: 'formulario-administrador',
    component: UsuarioAdministradorFormComponent
  },
  {/**
    * para crear un usuarioNormal
    */
    path: 'formulario-usuarioNormal',
    component: UsuarioNormalFormComponent
  },
  {/**
    * para crear un usuarioNormal siendo un cenad
    */
    path: 'formulario-usuarioNormal/:idCenad',
    component: UsuarioNormalFormComponent
  },
  {/**
    * para crear un gestor
    */
    path: 'formulario-gestor/:idCenad',
    component: UsuarioGestorFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}