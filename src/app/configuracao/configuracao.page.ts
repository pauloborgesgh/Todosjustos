import { AlertController, NavController } from '@ionic/angular';
import {  UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { FotoService } from '../foto.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {
  
[x: string]: any;

username = localStorage.getItem('username');
userData = {
  email: '',
  cpf: '',
  cidade: '',
  bairro: '',
  numero:'',
};



  constructor(
    public alertcontroller:AlertController,
    public navCtrl:NavController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public fotoservice:FotoService
    
  ) { this.storage.create(); }

  ngOnInit() {
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Salvando ...',
      duration: 3000,
    });

    loading.present();
  }


  functioMenu() {
    this.navCtrl.navigateForward('menu')
  }
  async AlertaSair() {
    const alert = await this.alertcontroller.create({
      // header: 'Excluir denuncia',
      message:'Deseja Realmente Sair',
  
      buttons:[
          {
            text: 'cancelar',
            role: 'cancel',
          
  
          },{
            text:'Sair',
            handler:() => this.showSair(),
             
          }
            
        
      ],//['Enviar'],
    });
  
    await alert.present();
  }
  
  ionViewWillEnter() {
    // Carrega os dados do armazenamento local e preenche os campos
    this.storage.get('userData').then((data) => {
      if (data) {
        this.userData = data;
      }
    });
  }

  salvarDados() {
    // Salva os dados no armazenamento local
    this.storage.set('userData', this.userData);
    this.dadosAtualizado();

  }
  async dadosAtualizado() {
    const alert = await this.alertcontroller.create({
      header: 'Dados Atualizado com Sucesso',
      
      buttons: ['Ok'],
    });

    await alert.present();
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

