import { Recurso } from "src/app/recursos/models/recurso";
import { TipoFormulario } from "./tipoFormulario";

export class TipoFormularioImpl implements TipoFormulario {
  idTipoFormulario: string;
  nombre: string;
  descripcion: string;
  recursos: Recurso[];
  codTipo: number;
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}