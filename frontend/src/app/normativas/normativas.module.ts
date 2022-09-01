import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NormativasRoutingModule } from './normativas-routing.module';
import { NormativasComponent } from './normativas/normativas.component';
import { NormativaFichaComponent } from './normativas/normativa-ficha/normativa-ficha.component';
import { NormativaFormComponent } from './normativa-form/normativa-form.component';
import { NormativaComponent } from './normativa/normativa.component';

@NgModule({
  declarations: [NormativasComponent, NormativaFichaComponent, NormativaComponent, NormativaFormComponent],
  imports: [
    CommonModule,
    NormativasRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class NormativasModule { }