import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterLink, RouterLinkWithHref, RouterModule, Routes } from '@angular/router';

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
    path: 'cadastrouser',
    loadChildren: () => import('./cadastrouser/cadastrouser.module').then( m => m.CadastrouserPageModule)
  },
  {
    path: 'fazerdenuncia',
    loadChildren: () => import('./fazerdenuncia/fazerdenuncia.module').then( m => m.FazerdenunciaPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./configuracao/configuracao.module').then( m => m.ConfiguracaoPageModule)
  },
  {
    path: 'prevencao',
    loadChildren: () => import('./prevencao/prevencao.module').then( m => m.PrevencaoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule,RouterLink,RouterLinkWithHref]
})
export class AppRoutingModule { }
