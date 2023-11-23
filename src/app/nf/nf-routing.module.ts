import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NfPage } from './nf.page';

const routes: Routes = [
  {
    path: '',
    component: NfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NfPageRoutingModule {}
