import { Component, Input, OnInit } from '@angular/core';
import { Cenad } from 'src/app/superadministrador/models/cenad';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  /**
   * variable que trae el cenad seleccionado del otro componente
   */
  @Input() cenad: Cenad;

  constructor() {}

  ngOnInit() {}
}
