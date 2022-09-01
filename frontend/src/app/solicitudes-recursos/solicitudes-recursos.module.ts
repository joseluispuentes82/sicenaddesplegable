import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRecursosRoutingModule } from './solicitudes-recursos-routing.module';
import { SolicitudesRecursosComponent } from './solicitudes-recursos/solicitudes-recursos.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SolicitudRecursoComponent } from './solicitud-recurso/solicitud-recurso.component';
import { SolicitudRecursoFormComponent } from './solicitud-recurso-form/solicitud-recurso-form.component';
import { SolicitudesTodasComponent } from './solicitudes-todas/solicitudes-todas.component';
import { ArmaComponent } from './solicitud-recurso-form/arma/arma.component';
import { FicheroSolicitudComponent } from './ficheros-solicitud/fichero-solicitud/fichero-solicitud.component';
import { FicheroSolicitudFichaComponent } from './ficheros-solicitud/fichero-solicitud-ficha/fichero-solicitud-ficha.component';
import { ArmaFichaSolicitudComponent } from './solicitud-recurso-form/arma-ficha-solicitud/arma-ficha-solicitud.component';


@NgModule({
  declarations: [SolicitudesRecursosComponent, SolicitudRecursoComponent, SolicitudRecursoFormComponent, SolicitudesTodasComponent, 
    ArmaComponent, FicheroSolicitudComponent, FicheroSolicitudFichaComponent, ArmaFichaSolicitudComponent ],
  imports: [
    CommonModule,
    SolicitudesRecursosRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SolicitudesRecursosModule { }
