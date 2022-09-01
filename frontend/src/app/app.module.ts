import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { CanActivateViaLoggingAdministrador } from "./logging/canActivateViaLoggingAdministrador";
import { CanActivateViaLoggingGestor } from "./logging/canActivateViaLoggingGestor";
import { CanActivateViaLoggingNormal } from "./logging/canActivateViaLoggingNormal";
import { CanActivateViaLoggingSuperadministrador } from "./logging/canActivateViaLoggingSuperadministrador";
import { APP_INITIALIZER } from "@angular/core";
import { AppConfigService } from "./services/app-config.service";
import { CanActivateViaLoggingLogeado } from "./logging/canActivateViaLoggingLogeado";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

/**
 * Plugins del modulo de Calendarios FullCalendar
 */
FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin]);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FontAwesomeModule,
    FullCalendarModule,
  ],
  /**
   * - hay que declarar los "guards"
   * - hay que declararel servicio con el que uso las variables de mi properties.json en tiempo de ejecucion
   */
  providers: [
    CanActivateViaLoggingAdministrador,
    CanActivateViaLoggingGestor,
    CanActivateViaLoggingNormal,
    CanActivateViaLoggingSuperadministrador,
    CanActivateViaLoggingLogeado,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
