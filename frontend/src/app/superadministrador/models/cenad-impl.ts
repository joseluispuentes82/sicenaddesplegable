import { UsuarioAdministrador } from "src/app/usuarios/models/usuarioAdministrador";
import { Cenad } from "./cenad";

export class CenadImpl implements Cenad {
  idCenad: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  tfno: string;
  email: string;
  escudo: string;
  provincia: number;
  infoCenad: string;
  url: string;
  usuarioAdministrador: UsuarioAdministrador | any;
  tieneAdmin: boolean = false;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
