import { ApiService } from './../service/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { User, UserService } from '../user.service';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],


})
export class HomePage {
 [ x: string]: any;
 public mostrarSenha: boolean = false;
 userNameValue: string = '';
 userName: string | undefined;
 userId : string ='';
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public router: Router,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public api: ApiService,
    public http: HttpClient
    
 
    ) {
    
    }

    
    public alternarVisibilidadeSenha(): void {
      this.mostrarSenha = !this.mostrarSenha;
    }
    
    
  function_Cadastro(){
    this.navCtrl.navigateForward('cadastrouser')
  }
  functionMenu(){
   return this.navCtrl.navigateForward('menu')
  }
  

  

  async login_accept(name: string, password: string) {
    // Simula uma espera de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Exibe o carregamento
    this.Loading();
  
    try {
      // Faz a solicitação à API para autenticar o usuário com email e senha fornecidos
      const response = await fetch(`http://localhost:3000/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }), // Envia nome e senha no corpo da requisição
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }
  
      const user = await response.json();
      if (user) {
        // Alerta de login bem-sucedido
        this.LoginAlerta();
        
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.name);
       
        
        // Executa a função para configurar o menu
        this.functionMenu();
      } else {
        // Exibe alerta se o usuário não for encontrado
        this.exibirAlerta();
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
      this.exibirAlerta();
    }
  }
  
async Loading() {
  const loading = await this.loadingCtrl.create({
    message: 'Aguarde..',
    duration: 1000,  
  });
  loading.present();
  await new Promise(resolve => setTimeout(resolve, 1000));

  
}



  async exibirAlerta() {
    const alert = await this['alertController'].create({
      header: 'Usuario ou senha incorretos ',
      message: 'Verifique os campos',
      buttons: ['OK']
      
    });

    await alert.present();
  }

  async LoginAlerta() {
    const alert = await this['alertController'].create({
      header: 'Login Com Sucesso',
      //message: 'Verifique os campos',

      buttons: ['OK']
    });

    await alert.present();
  }
  async showLoading() {
    const loading = await this['loadingCtrl'].create({
      message: 'Logando..',
      duration: 1200,
      
    });
    
    loading.present();
    await new Promise(resolve => setTimeout(resolve, 500));
    

  }
  


  

}
