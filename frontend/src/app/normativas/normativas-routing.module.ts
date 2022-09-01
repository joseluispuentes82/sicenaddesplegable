import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NormativaFormComponent } from './normativa-form/normativa-form.component';
import { NormativasComponent } from './normativas/normativas.component';

const routes: Routes = [
  {/**
    * para ver el listado de normativas de un cenad
    */
    path: '',
    component: NormativasComponent
  },
  {/**
    * para crear una normativa en un cenad
    */
    path: 'formulario/:idCenad',
    component: NormativaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormativasRoutingModule { }