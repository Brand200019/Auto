import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NfPageRoutingModule } from './nf-routing.module';

import { NfPage } from './nf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NfPageRoutingModule
  ],
  declarations: [NfPage]
})
export class NfPageModule {}
