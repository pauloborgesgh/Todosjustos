import { FotoService } from './../foto.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prevencao',
  templateUrl: './prevencao.page.html',
  styleUrls: ['./prevencao.page.scss'],
})
export class PrevencaoPage implements OnInit {

  constructor(
    public FotoService:FotoService,
    public navCtrl :NavController,
  ) { }

  ngOnInit() {
  }
  functionVoltar(){
    this.navCtrl.navigateRoot('menu');
  }
}
