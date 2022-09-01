import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartografiasRoutingModule } from './cartografias-routing.module';
import { CartografiasComponent } from './cartografias/cartografias.component';
import { CartografiaFichaComponent } from './cartografias/cartografia-ficha/cartografia-ficha.component';
import { CartografiaComponent } from './cartografia/cartografia.component';
import { CartografiaFormComponent } from './cartografia-form/cartografia-form.component';

@NgModule({
  declarations: [CartografiasComponent, CartografiaFichaComponent, CartografiaComponent, CartografiaFormComponent],
  imports: [
    CommonModule,
    CartografiasRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class CartografiasModule { }