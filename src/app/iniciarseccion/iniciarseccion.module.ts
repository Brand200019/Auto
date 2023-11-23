import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarseccionPageRoutingModule } from './iniciarseccion-routing.module';

import { IniciarseccionPage } from './iniciarseccion.page';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarseccionPageRoutingModule,
    MatIconModule
  ],
  declarations: [IniciarseccionPage]
})
export class IniciarseccionPageModule {}
