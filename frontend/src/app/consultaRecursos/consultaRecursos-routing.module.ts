import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaRecursoFormComponent } from './consultaRecurso-form/consultaRecurso-form.component';
import { ConsultaRecursosComponent } from './consultaRecursos/consultaRecursos.component';

const routes: Routes = [
  {/**
    * muestra el listado de los recursos de un cenad
    */
    path: '',
    component: ConsultaRecursosComponent
  },
  {/**
    * muestra el contenido de un recurso, en vista "gestor" o vista "usuario" segun este logueado
    */
    path: 'formulario/:idRecurso',
    component: ConsultaRecursoFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRecursosRoutingModule { }
