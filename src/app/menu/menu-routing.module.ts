import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink, RouterLinkWithHref } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,RouterLink,RouterLinkWithHref],
})
export class MenuPageRoutingModule {}
