import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SeguridadGuard } from './S&G/seguridad.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'iniciarseccion',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [SeguridadGuard] 
  },
  {
    path: 'iniciarseccion',
    loadChildren: () => import('./iniciarseccion/iniciarseccion.module').then( m => m.IniciarseccionPageModule)
  },
  {
    path: 'recuperarcontra',
    loadChildren: () => import('./recuperarcontra/recuperarcontra.module').then( m => m.RecuperarcontraPageModule)
  },
  {
    path: 'nf',
    loadChildren: () => import('./nf/nf.module').then( m => m.NfPageModule)
  },

  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule), canActivate: [SeguridadGuard] 
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./viaje/viaje.module').then( m => m.ViajePageModule), canActivate: [SeguridadGuard] 
  },
  {
    path:'**',
    redirectTo:'/nf',
    pathMatch:'full'
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
