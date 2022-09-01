import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriasComponent } from './categorias/categorias.component';

const routes: Routes = [
  {/**
    * para ver el listado de categorias de un cenad
    */
    path: '',
    component: CategoriasComponent
  },
  {/**
    * para crear una categoria en un cenad
    */
    path: 'formulario/:idCenad',
    component: CategoriaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }