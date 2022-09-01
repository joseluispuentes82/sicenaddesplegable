import { Recurso } from "src/app/recursos/models/recurso";
import { Cenad } from "src/app/superadministrador/models/cenad";
import { Categoria } from "./categoria";

export class CategoriaImpl implements Categoria {
  idCategoria: string;
  nombre: string;
  descripcion: string;
  subcategorias: Categoria[];
  categoriaPadre: Categoria | any;
  cenad: string | Cenad;
  recursos: Recurso[];
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}