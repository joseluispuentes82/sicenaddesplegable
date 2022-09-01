import { Unidad } from "src/app/unidades/models/unidad";
import { UsuarioNormal } from "./usuarioNormal";

export class UsuarioNormalImpl implements UsuarioNormal {
  idUsuario: string;
  nombre: string;
  password: string;
  tfno: string;
  email: string;
  unidad: Unidad | any;
  tipo: string;
  descripcion:string;
  emailAdmitido: boolean;
  url: string;  
  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}