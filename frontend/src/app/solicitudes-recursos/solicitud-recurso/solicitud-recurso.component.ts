import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { SolicitudRecurso } from '../models/solicitud-recurso';
import { SolicitudRecursoService } from '../service/solicitud-recurso.service';

@Component({
  selector: 'app-solicitud-recurso',
  templateUrl: './solicitud-recurso.component.html',
  styleUrls: ['./solicitud-recurso.component.css']
})
export class SolicitudRecursoComponent implements OnInit {
  /**
   * variable que recibe el objeto solicitud
   */
  @Input() solicitud: SolicitudRecurso;
  /**
   * variable que recibe el id del Cenad
   */
  @Input() idCenad: string;
  /**
   * si se está en el modal
   */
  @Input() isModal: boolean = false;
  /**
   * icono Fontaweson 'editar
   */
  faEdit = faEdit;
  /**
   * variable para parsear la fecha de la solicitud
   */
  fechaSolicitudParse: Date;

  /**
   * 
   * @param router para redireccionar a una pagina de la aplicacion
   * @param solicitudService contiene los metodos propios del módulo SolicitudRecurso
   */
  constructor(private router: Router, private solicitudService: SolicitudRecursoService) { }

  ngOnInit() {
    //cambiar el formato de la fecha de la solicitud
    this.fechaSolicitudParse = this.cambiarFormatoDate2sinHora(this.solicitud.fechaSolicitud);
    //obtiene el objeto UsuarioNormal de la solicitud pasada como parámetro
    this.solicitudService.getUsuarioNormalDeSolicitud(this.solicitud.idSolicitud).subscribe((response) => {
      this.solicitud.usuarioNormal = this.solicitudService.mapearUsuarioNormal(response);
    });
    //obtiene el objeto Recurso de la solicitud pasada como parámetro
    this.solicitudService.getRecursoDeSolicitud(this.solicitud.idSolicitud).subscribe((response) => {
      this.solicitud.recurso = this.solicitudService.mapearRecurso((response));
    });
  }

  /**
   * método que al recibir como parámetro una solicitud, redirecciona el navegador 
   * al componente formulario para su edición
   * @param solicitudEdicion objeto solicitudRecurso
   */
  editar(solicitudEdicion: SolicitudRecurso): void {
    if (!this.isModal) {
      this.router.navigate([`principalCenad/${this.idCenad}/solicitudesRecursos/${this.idCenad}/formulario/${this.idCenad}/${solicitudEdicion.idSolicitud}`]);
    }
  }

  /**
   * método que recibe una variable string en formato fecha y devuelte una variable Date
   * @param date string formato fecha yyyy-MM-dd
   * @returns un dato formato fecha Date
   */
  cambiarFormatoDate2sinHora(date: string): Date {
    let arrayDate: any[] = date.split(/[/\s\:\-]/g);
    let fechaDate: Date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
    return fechaDate;
  }
}
