import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursosRoutingModule } from './recursos-routing.module';
import { RecursosComponent } from './recursos/recursos.component';
import { RecursoComponent } from './recurso/recurso.component';
import { RecursoFormComponent } from './recurso-form/recurso-form.component';
import { RecursoFichaComponent } from './recursos/recurso-ficha/recurso-ficha.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [RecursosComponent, RecursoComponent, RecursoFormComponent, RecursoFichaComponent],
  imports: [
    CommonModule,
    RecursosRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class RecursosModule {}