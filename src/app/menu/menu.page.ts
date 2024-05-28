import { TaskService } from './../task.service';
import { FotoService } from './../foto.service';

import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { Foto } from '../foto.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ListaPageModule } from '../lista/lista.module';
// import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  [x: string]: any;
  header:any;

  
  // fotoPerfil = [
  //   {
  //     nome: "Paulo",
  //     webviewPath: "https://tse1.explicit.bing.net/th?id=OIP.zP1mlHnV1bpgODW8gvQSFQHaIP&pid=Api&P=0&h=180",
  //   }
  // ];
  constructor(
    public navCtrl : NavController,
    public plataform:Platform ,
    public alertController: AlertController,
    public userservice:UserService,
    public toastontroller:ToastController,
    public fotoservice:FotoService,
    public router:Router,
    public loadingCtrl: LoadingController,
    public taskService:TaskService
    
  ) { 
    

  }

  ngOnInit() {
  }
 
  functioDenuncia() {
    this.navCtrl.navigateForward('fazerdenuncia')
  }
  functionList() {
    this.navCtrl.navigateForward('lista')
  }

  functioninfo() {
    this.navCtrl.navigateForward('info')
  }
  logout(){
    this['authenticationService'].logout().subscribe(
      (      data: any) => {this.router.navigate(['home'])},
      (      erro: any) => console.log(erro)
    )
  }
  imageUrl: string = "https://exemplo.com/caminho/para/imagem.jpg";
  alterarImagemNova() {
    this.imageUrl = "https://exemplo.com/nova/imagem.jpg";
  }



  async tirarFoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
      source: CameraSource.Camera,
    });

    this.fotoservice.fotoPerfil[0].webviewPath = capturedPhoto.webPath ?? ' ';

  }
  functionhome() {
    
    this.navCtrl.navigateBack('home')
  }
  async AlertaSair() {
        const alert = await this.alertController.create({
          
          message:'Deseja Realmente Sair',
      
          buttons:[
              {
                text: 'cancelar',
                role: 'cancel',
              
    
              },{
                text:'Sair',
                handler:() => this.functionhome
                
                 
              }
                
            
          ],
        });
        
        await alert.present();
      }


      async showSair() {
        const loading = await this.loadingCtrl.create({
          message: 'Saindo..',
          duration: 1000,  
        });
        loading.present();
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        this.functionhome();
      }
      async loadingAdd() {
        const loading = await this.loadingCtrl.create({
          message: 'Aguarde ...',
          duration: 3000,
        });
    
        loading.present();
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }
      async presentAlertAdd() {
        const alert = await this['alertController'].create({
          header: 'Fazer Denuncia',
          inputs:[
            {
              name: 'rua',
              type: 'text',
              placeholder:'Rua'

            },
            {
              name:'address',
              placeholder: 'Bairro',
              attributes: {
                maxlength: 20,
              },
            },
            {
              name:'numero',
              type: 'number',
              placeholder: 'Numero',
              min: 1,
              max: 100,
            },
            {
              name:'obs',
              type: 'textarea',
              placeholder: 'Observação',
            },
            {
              name:'date',
              type:'date',
              min: '2023-01-01', 
              max:'2024-12-30'
            },
          ],
          subHeader: 'Envio de Dados',
          //message: 'This is an alert!',
          buttons:[
              {
                text: 'cancelar',
                role: 'cancel',
                cssClass: 'secondary',
    
              },{
                text:'OK',
                
                handler:async (alert: { task: string; rua: string; address: string; numero: string; obs: string; date: string; }) =>{
                  
                  if (alert.task !==" ")
                  this.loadingAdd(),
                  await new Promise(resolve => setTimeout(resolve, 3000)),
                  
                  this.taskService.denunciaIndex(alert.rua,alert.address,alert.numero,alert.obs,alert.date);
                 
                 
                 else{
                    // this.presentToast();
                    this.presentAlertAdd();
                 
                  
                 }
                }
    
              }
    
          ],//['Enviar'],
        });
    
        await alert.present();
      }
    
    
    
}