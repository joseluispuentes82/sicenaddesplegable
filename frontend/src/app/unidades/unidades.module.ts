import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UnidadFormComponent } from './unidad-form/unidad-form.component';
import { UnidadFichaComponent } from './unidades/unidad-ficha/unidad-ficha.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { UnidadComponent } from './unidad/unidad.component';
import { UnidadesRoutingModule } from './unidades-routing.module';

@NgModule({
  declarations: [UnidadesComponent, UnidadComponent, UnidadFichaComponent, UnidadFormComponent],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class UnidadesModule {}