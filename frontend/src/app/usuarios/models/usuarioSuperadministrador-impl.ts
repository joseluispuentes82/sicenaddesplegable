import { UsuarioSuperadministrador } from "./usuarioSuperadministrador";

export class UsuarioSuperadministradorImpl implements UsuarioSuperadministrador {
  idUsuario: string;
  nombre: string;
  password: string;
  tfno: string;
  email: string;
  tipo:string;
  descripcion:string;
  emailAdmitido: boolean;
  url: string;
  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}