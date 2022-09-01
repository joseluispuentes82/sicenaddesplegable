import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsuarioNormalFormComponent } from './usuariosNormal/usuarioNormal-form/usuarioNormal-form.component';
import { UsuarioNormalFichaComponent } from './usuariosNormal/usuarioNormal-ficha/usuarioNormal-ficha.component';
import { UsuarioNormalComponent } from './usuariosNormal/usuarioNormal/usuarioNormal.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioAdministradorComponent } from './usuariosAdministrador/usuarioAdministrador/usuarioAdministrador.component';
import { UsuarioAdministradorFichaComponent } from './usuariosAdministrador/usuarioAdministrador-ficha/usuarioAdministrador-ficha.component';
import { UsuarioAdministradorFormComponent } from './usuariosAdministrador/usuarioAdministrador-form/usuarioAdministrador-form.component';
import { UsuarioGestorComponent } from './usuariosGestor/usuarioGestor/usuarioGestor.component';
import { UsuarioGestorFichaComponent } from './usuariosGestor/usuarioGestor-ficha/usuarioGestor-ficha.component';
import { UsuarioGestorFormComponent } from './usuariosGestor/usuarioGestor-form/usuarioGestor-form.component';

@NgModule({
  declarations: [UsuariosComponent, UsuarioNormalComponent, UsuarioNormalFichaComponent, UsuarioNormalFormComponent, UsuarioAdministradorComponent, UsuarioAdministradorFichaComponent, UsuarioAdministradorFormComponent, UsuarioGestorComponent, UsuarioGestorFichaComponent, UsuarioGestorFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class UsuariosModule {}