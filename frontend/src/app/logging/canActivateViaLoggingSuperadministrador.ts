import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from "@angular/router";

@Injectable()
export class CanActivateViaLoggingSuperadministrador implements CanActivateChild {
  /**
   *
   * @param router Para redirigir
   */
  constructor(private router: Router) {}
  /**
   * si el usuario no está loggeado como superadministrador le dará un alert y le llevará a la pagina principal del cenad de donde venia
   */
  canActivateChild() {
    if (sessionStorage.isSuperAdmin !== "true") {
      this.router.navigate([`/`]);
      alert("Debes identificarte como superadministrador para continuar");
      return false;
    }
    return true;
  }
}
