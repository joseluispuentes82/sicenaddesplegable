import { Recurso } from "src/app/recursos/models/recurso";
import { Cenad } from "src/app/superadministrador/models/cenad";

export interface Categoria {
  idCategoria: string;
  nombre: string;
  descripcion: string;
  subcategorias: Categoria[];
  categoriaPadre: Categoria | any;
  cenad: Cenad | string;
  recursos: Recurso[];
  url: string;
}