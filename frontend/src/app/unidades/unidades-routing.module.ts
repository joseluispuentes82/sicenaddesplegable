import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadFormComponent } from './unidad-form/unidad-form.component';
import { UnidadesComponent } from './unidades/unidades.component';

const routes: Routes = [
  {
    /**
     * muestra el listado de unidades
     */
    path: '',
    component: UnidadesComponent
  },
  {
    /**
     * para crear una nueva unidad
     */
    path: 'formulario',
    component: UnidadFormComponent
  },
  {
    /**
     * para crear una nueva unidad siendo un cenad
     */
    path: 'formulario/:idCenad',
    component: UnidadFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesRoutingModule {}
