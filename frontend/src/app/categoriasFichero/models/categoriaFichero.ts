import { Fichero } from "src/app/recursos/models/fichero";

export interface CategoriaFichero {
  idCategoriaFichero: string;
  nombre: string;
  descripcion: string;
  tipo: number;
  url: string;
  ficheros: Fichero[];
}
