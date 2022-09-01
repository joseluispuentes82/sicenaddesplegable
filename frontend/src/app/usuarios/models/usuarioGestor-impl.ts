import { Cenad } from "src/app/superadministrador/models/cenad";
import { UsuarioGestor } from "./usuarioGestor";

export class UsuarioGestorImpl implements UsuarioGestor {
  idUsuario: string;
  nombre: string;
  password: string;
  tfno: string;
  email: string;
  cenad: Cenad | any;
  tipo:string;
  descripcion:string;
  emailAdmitido: boolean;
  url: string;  
  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}