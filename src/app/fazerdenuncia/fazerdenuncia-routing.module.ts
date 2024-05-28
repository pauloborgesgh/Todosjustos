import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FazerdenunciaPage } from './fazerdenuncia.page';

const routes: Routes = [
  {
    path: '',
    component: FazerdenunciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FazerdenunciaPageRoutingModule {}
