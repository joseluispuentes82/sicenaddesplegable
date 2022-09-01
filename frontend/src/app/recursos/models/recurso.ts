import { Categoria } from "src/app/categorias/models/categoria";
import { TipoFormulario } from "src/app/tiposFormulario/models/tipoFormulario";
import { UsuarioGestor } from "src/app/usuarios/models/usuarioGestor";
import { Fichero } from "./fichero";

export interface Recurso {
  idRecurso: string;
  nombre: string;
  descripcion: string;
  otros: string;
  ficheros: Fichero[];
  usuarioGestor: UsuarioGestor | any;
  categoria: Categoria | any;
  tipoFormulario: TipoFormulario | any;
  conDatosEspecificosSolicitud: boolean;
  datosEspecificosSolicitud: string;
  url: string;
}