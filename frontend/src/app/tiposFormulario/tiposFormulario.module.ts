import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TiposFormularioRoutingModule } from './tiposFormulario-routing.module';
import { TipoFormularioFormComponent } from './tipoFormulario-form/tipoFormulario-form.component';
import { TipoFormularioComponent } from './tipoFormulario/tipoFormulario.component';
import { TipoFormularioFichaComponent } from './tiposFormulario/tipoFormulario-ficha/tipoFormulario-ficha.component';
import { TiposFormularioComponent } from './tiposFormulario/tiposFormulario.component';

@NgModule({
  declarations: [TiposFormularioComponent, TipoFormularioComponent, TipoFormularioFichaComponent, TipoFormularioFormComponent],
  imports: [
    CommonModule,
    TiposFormularioRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class TiposFormularioModule {}