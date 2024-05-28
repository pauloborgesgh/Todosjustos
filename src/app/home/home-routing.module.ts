import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkWithHref, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,RouterLinkWithHref,RouterLink]
})
export class HomePageRoutingModule {}
