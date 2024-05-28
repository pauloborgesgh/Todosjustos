import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink, RouterLinkWithHref } from '@angular/router';

import { ListaPage } from './lista.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,RouterLink,RouterLinkWithHref],
})
export class ListaPageRoutingModule {}
