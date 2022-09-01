import { Fichero } from "src/app/recursos/models/fichero";
import { CategoriaFichero } from "./categoriaFichero";

export class CategoriaFicheroImpl implements CategoriaFichero {
  idCategoriaFichero: string;
  nombre: string;
  descripcion: string;
  tipo: number;
  url: string;
  ficheros: Fichero[];
  
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
