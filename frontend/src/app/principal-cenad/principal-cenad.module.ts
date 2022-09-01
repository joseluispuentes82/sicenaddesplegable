import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalCenadRoutingModule } from './principal-cenad-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShellPrincipalComponent } from './shell-principal/shell-principal.component';
import { FooterPrincipalComponent } from './shell-principal/footer-principal/footer-principal.component';
import { HeaderPrincipalComponent } from './shell-principal/header-principal/header-principal.component';
import { MainPrincipalComponent } from './shell-principal/main-principal/main-principal.component';
import { HomePrincipalComponent } from './home-principal/home-principal.component';

@NgModule({
  declarations: [ShellPrincipalComponent, FooterPrincipalComponent, HeaderPrincipalComponent, MainPrincipalComponent, HomePrincipalComponent],
  imports: [
    CommonModule,
    PrincipalCenadRoutingModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class PrincipalCenadModule {}