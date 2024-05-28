import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { User, UserService } from '../user.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 [ x: string]: any;
 public mostrarSenha: boolean = false;
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public router: Router,
    public userService: UserService,
    public loadingCtrl: LoadingController,
 
    ) {
    // this.authenticationService.logged().subscribe(
    //   (      data: null) =>{
    //     if (data != null) this.router.navigate(['menu'])
    //   },
    //   (      erro: any) => console.log(erro)
    // ) 
     
  
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
  

  login_accept(userName: string, userPassword: string): void {
    'await'; new Promise(resolve => setTimeout(resolve, 2000));
    const users = this.userService.getUsers();
    const user = users.find((u: User) => u.email == userName && u.senha == userPassword);
    
    if (user) {
      
      this.functionMenu();
    } else {
      this.exibirAlerta();
    }
  }
  async exibirAlerta() {
    const alert = await this['alertController'].create({
      header: 'Usuario ou senha incorretos ',
      message: 'Verifique os campos',
      buttons: ['OK']
      
    });

    await alert.present();
  }

  // async LoginAlerta() {
  //   const alert = await this['alertController'].create({
  //     header: 'Login Com Sucesso',
  //     //message: 'Verifique os campos',

  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }
  async showLoading() {
    const loading = await this['loadingCtrl'].create({
      message: 'Conectando..',
      duration: 1000,
      
    });
    
    loading.present();
    await new Promise(resolve => setTimeout(resolve, 500));
    

  }
  

  // async showSair() {
  //   const loading = await this['loadingCtrl'].create({
  //     message: 'Saindo..',
  //     duration: 1000,
      
  //   }
   
  //   );
  //   this.functionhome()
  //   loading.present();
  // }
  

  

}
