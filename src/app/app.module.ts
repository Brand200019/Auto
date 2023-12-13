import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';
import { MatIconModule } from '@angular/material/icon';
import { firebaseConfig } from '../environments/firebase';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import { from } from 'rxjs';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
            IonicStorageModule.forRoot(), MatIconModule,
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFirestoreModule,AngularFireDatabaseModule,
            AngularFireAuthModule,
            provideFirebaseApp(() =>initializeApp(firebaseConfig)),
            provideFirestore(()=>getFirestore()),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
