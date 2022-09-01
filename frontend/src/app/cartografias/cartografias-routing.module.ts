import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartografiaFormComponent } from './cartografia-form/cartografia-form.component';
import { CartografiasComponent } from './cartografias/cartografias.component';


const routes: Routes = [
  {// para ver el listado de cartografias de un cenad
    path: '',
    component: CartografiasComponent
  },
  {// para crear una cartografia en un cenad
    path: 'formulario/:idCenad',
    component: CartografiaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartografiasRoutingModule { }
