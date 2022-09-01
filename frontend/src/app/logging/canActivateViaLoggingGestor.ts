import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable()
export class CanActivateViaLoggingGestor implements CanActivateChild {
  /**
   * Variable que representa el Id del CENAD
   */
  idCenad: string = "";

  /**
   *
   * @param router Para redirigir
   */
  constructor(private router: Router) {}

  /**
   * si el usuario no está loggeado como gestor le dará un alert y le llevará a la pagina principal del cenad de donde venia
   */
  canActivateChild() {
    if (sessionStorage.isGestor !== "true") {
      let url = location.toString();
      this.idCenad = this.getId(url);
      this.router.navigate([`/principalCenad/${this.idCenad}`]);
      alert("Debes identificarte como gestor para continuar");
      return false;
    }
    return true;
  }

  /**
   * metodo para extraer el id de la url
   * @param url url de la que queremos extraer el Id
   * @returns Devuelve el id de esa url
   */ getId(url: string): string {
    return url.slice(url.lastIndexOf("/") + 1, url.length);
  }
}
