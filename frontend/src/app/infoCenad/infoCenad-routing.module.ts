import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoCenadComponent } from './infoCenad/infoCenad.component';


const routes: Routes = [
  {
    /**
     * muestra la información básica de un cenad
     */
    path: '',
    component: InfoCenadComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoCenadRoutingModule { }