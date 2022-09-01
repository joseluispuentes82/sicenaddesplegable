import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudRecursoFormComponent } from './solicitud-recurso-form/solicitud-recurso-form.component';
import { SolicitudesRecursosComponent } from './solicitudes-recursos/solicitudes-recursos.component';
import { SolicitudesTodasComponent } from './solicitudes-todas/solicitudes-todas.component';


const routes: Routes = [
  {//componente donde aparecen las solicitudes agrupadas por estado (solo se visualizan las 5 primeras)
    path: '',
    component: SolicitudesRecursosComponent
  },
  {//componente donde se pueden visualizar todas las solicitudes
    path: 'solicitudesTodas/:idCenad',
    component: SolicitudesTodasComponent
  },
  {//componente formulario, donde se pueden crear, actualizar y borrar solicitudes
    path: 'formulario/:idCenad/:idSolicitud',
    component: SolicitudRecursoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRecursosRoutingModule { }
