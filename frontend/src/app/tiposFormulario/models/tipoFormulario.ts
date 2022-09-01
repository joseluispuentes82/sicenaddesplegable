import { Recurso } from "src/app/recursos/models/recurso";

export interface TipoFormulario {
  idTipoFormulario: string;
  nombre: string;
  descripcion: string;
  recursos: Recurso[];
  codTipo: number;
  url: string;
}