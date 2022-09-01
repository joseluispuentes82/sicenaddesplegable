import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoCenadRoutingModule } from './infoCenad-routing.module';
import { InfoCenadComponent } from './infoCenad/infoCenad.component';

@NgModule({
  declarations: [InfoCenadComponent],
  imports: [
    CommonModule,
    InfoCenadRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class InfoCenadModule { }