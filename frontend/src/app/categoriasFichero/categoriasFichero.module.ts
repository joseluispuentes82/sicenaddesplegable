import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriaFicheroFormComponent } from './categoriaFichero-form/categoriaFichero-form.component';
import { CategoriaFicheroComponent } from './categoriaFichero/categoriaFichero.component';
import { CategoriasFicheroRoutingModule } from './categoriasFichero-routing.module';
import { CategoriaFicheroFichaComponent } from './categoriasFichero/categoriaFichero-ficha/categoriaFichero-ficha.component';
import { CategoriasFicheroComponent } from './categoriasFichero/categoriasFichero.component';

@NgModule({
  declarations: [CategoriasFicheroComponent, CategoriaFicheroComponent, CategoriaFicheroFichaComponent, CategoriaFicheroFormComponent],
  imports: [
    CommonModule,
    CategoriasFicheroRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class CategoriasFicheroModule { }