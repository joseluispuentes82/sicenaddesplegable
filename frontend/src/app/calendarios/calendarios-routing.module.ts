import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioCenadComponent } from './calendario-cenad/calendario-cenad.component';
import { PlanificacionCalendarioFormComponent } from './planificacion-calendario-form/planificacion-calendario-form.component';


const routes: Routes = [
  {/**
    * muestra el calendario
    */
    path: '',
    component: CalendarioCenadComponent
  },
  {/**
    * para crear, actualizar, borrar solicitudes Planificadas (superAdministrador) y Avisos (administrador)
    */
    path: 'formulario/:idCenad/:idSolicitud',
    component: PlanificacionCalendarioFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendariosRoutingModule { }
