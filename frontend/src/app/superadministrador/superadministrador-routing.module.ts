import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenadFormComponent } from './cenads/cenad-form/cenad-form.component';
import { SuperadministradorComponent } from './superadministrador/superadministrador.component';

const routes: Routes = [
  {
    /**
     * muestra la pantalla inicial del superadministrador
     */
    path: '',
    component: SuperadministradorComponent
  },
  {
    /**
     * para crear un cenad
     */
    path: 'formulario-cenad',
    component: CenadFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadministradorRoutingModule {}
