import { UsuarioNormal } from "src/app/usuarios/models/usuarioNormal";
import { Unidad } from "./unidad";

export class UnidadImpl implements Unidad {
  idUnidad: string;
  nombre: string;
  direccion: string;
  usuariosNormal: UsuarioNormal[];
  tfno: string;
  email: string;
  poc: string;
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}