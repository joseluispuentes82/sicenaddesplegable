import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArmaFormComponent } from './arma-form/arma-form.component';
import { ArmasComponent } from './armas/armas.component';


const routes: Routes = [
  {/**
    * muestra el listado de armas
    */
    path: '',
    component: ArmasComponent
  },
  {/**
    * para crear un nuevo arma
    */
    path: 'formulario',
    component: ArmaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArmasRoutingModule {}
