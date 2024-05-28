import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrouserPageRoutingModule } from './cadastrouser-routing.module';

import { CadastrouserPage } from './cadastrouser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrouserPageRoutingModule
  ],
  declarations: [CadastrouserPage]
})
export class CadastrouserPageModule {}
