import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracaoPageRoutingModule } from './configuracao-routing.module';

import { ConfiguracaoPage } from './configuracao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracaoPageRoutingModule
  ],
  declarations: [ConfiguracaoPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfiguracaoPageModule {}
