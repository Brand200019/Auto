import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarseccionPage } from './iniciarseccion.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarseccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarseccionPageRoutingModule {}
