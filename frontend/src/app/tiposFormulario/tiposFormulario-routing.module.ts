import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoFormularioFormComponent } from './tipoFormulario-form/tipoFormulario-form.component';
import { TiposFormularioComponent } from './tiposFormulario/tiposFormulario.component';

const routes: Routes = [
  {
    /**
     * muestra el listado de tipos de formulario
     */
    path: '',
    component: TiposFormularioComponent
  },
  {
    /**
     * para crear un nuevo tipo de formulario
     */
    path: 'formulario',
    component: TipoFormularioFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposFormularioRoutingModule {}
