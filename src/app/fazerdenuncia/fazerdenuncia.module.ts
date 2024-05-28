import {  NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FazerdenunciaPageRoutingModule } from './fazerdenuncia-routing.module';

import { FazerdenunciaPage } from './fazerdenuncia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FazerdenunciaPageRoutingModule
  ],
  declarations: [FazerdenunciaPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class FazerdenunciaPageModule {}
