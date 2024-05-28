import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrouserPage } from './cadastrouser.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrouserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrouserPageRoutingModule {}
