import { Unidad } from "src/app/unidades/models/unidad";

export interface UsuarioNormal {
  idUsuario: string;
  nombre: string;
  password: string;
  tfno: string;
  email: string;
  unidad: Unidad | any;
  tipo:string;
  descripcion:string;
  emailAdmitido: boolean;
  url: string;}