import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArmaFormComponent } from './arma-form/arma-form.component';
import { ArmaComponent } from './arma/arma.component';
import { ArmasRoutingModule } from './armas-routing.module';
import { ArmaFichaComponent } from './armas/arma-ficha/arma-ficha.component';
import { ArmasComponent } from './armas/armas.component';

@NgModule({
  declarations: [ArmasComponent, ArmaComponent, ArmaFichaComponent, ArmaFormComponent],
  imports: [
    CommonModule,
    ArmasRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class ArmasModule {}