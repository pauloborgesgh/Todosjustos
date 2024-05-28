import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import {  FotoService } from '../foto.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  
  

  constructor(
    public navCtrl : NavController,
    public fotoService:FotoService,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }
  functionVoltar() {
    this.navCtrl.navigateBack('menu')
  }
  async functionDeslogar(){
    this.navCtrl.navigateForward('/home')
  }
  

  async showSair() {
    const loading = await this.loadingCtrl.create({
      message: 'Saindo..',
      duration: 1000,  // Defina o tempo desejado em milissegundos
    });
  
    loading.present();
  
    // Aguarde o tempo definido antes de chamar this.functionhome()
    await new Promise(resolve => setTimeout(resolve, 1000));  // Aguarda 1 segundo
  
    // Chame a função para sair do aplicativo
    this.functionDeslogar();
  }

 

}
