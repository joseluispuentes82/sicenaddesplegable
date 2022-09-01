import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadministradorRoutingModule } from './superadministrador-routing.module';
import { FormsModule } from '@angular/forms';
import { SuperadministradorComponent } from './superadministrador/superadministrador.component';
import { CenadFormComponent } from './cenads/cenad-form/cenad-form.component';
import { CenadComponent } from './cenads/cenad/cenad.component';
import { CenadFichaComponent } from './cenads/cenad-ficha/cenad-ficha.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SuperadministradorComponent, CenadComponent, CenadFichaComponent, CenadFormComponent],
  imports: [
    CommonModule,
    SuperadministradorRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SuperadministradorModule {}