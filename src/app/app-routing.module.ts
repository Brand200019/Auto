import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio1',
    loadChildren: () => import('./inicio1/inicio1.module').then( m => m.Inicio1PageModule)
  },
  {
    path: 'recuperarcontra',
    loadChildren: () => import('./recuperarcontra/recuperarcontra.module').then( m => m.RecuperarcontraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }