import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaFicheroFormComponent } from './categoriaFichero-form/categoriaFichero-form.component';
import { CategoriasFicheroComponent } from './categoriasFichero/categoriasFichero.component';

const routes: Routes = [
  {/**
    * para ver el listado de categorias de fichero
    */
    path: '',
    component: CategoriasFicheroComponent
  },
  {/**
    * para crear una categoria de fichero
    */
    path: 'formulario',
    component: CategoriaFicheroFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasFicheroRoutingModule { }