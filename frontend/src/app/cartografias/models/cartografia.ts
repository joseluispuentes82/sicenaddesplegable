import { CategoriaFichero } from "src/app/categoriasFichero/models/categoriaFichero";
import { Cenad } from "src/app/superadministrador/models/cenad";

export interface Cartografia {
  idCartografia: string;
  nombre: string;
  descripcion: string;
  nombreArchivo: string;
  escala: string;
  sistemaReferencia: string;
  categoriaFichero: CategoriaFichero | any;
  cenad: Cenad | string;
  fechaCartografia: Date;
  url: string;
}