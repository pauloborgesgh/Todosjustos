import { ApiService } from './../service/api.service';
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


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  [x: string]: any;
  header:any;
  emailAtual: string = '';
  
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
    public api:ApiService,
    public taskService:TaskService
    
  ) { 
    

  }

  ngOnInit() {
    // this.emailAtual = this['userService'].getEmailAtual(); 
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
        const alert = await this.alertController.create({
          header: 'Fazer Denúncia',
          inputs: [
            {
              name: 'rua',
              type: 'text',
              placeholder: 'Rua'
            },
            {
              name: 'bairro',
              type: 'text',
              placeholder: 'Bairro',
              attributes: {
                maxlength: 20
              }
            },
            {
              name: 'cidade',
              type: 'text',
              placeholder: 'Cidade',
              attributes: {
                maxlength: 20
              }
            },
            {
              name: 'numero',
              type: 'number',
              placeholder: 'Número',
            
            },
            {
              name: 'Dia',
              type: 'date',
              min: '2023-01-01',
              max: '2024-12-30'
            },
            {
              name: 'obs',
              type: 'textarea',
              placeholder: 'Observação'
            }
          ],
          subHeader: 'Envio de Dados',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'OK',
              handler: (denuncia) => {
                this.api.postData(denuncia).subscribe(response => {
                  console.log('Denúncia adicionada', response);
                  // Adicione qualquer lógica adicional após adicionar a denúncia
                }, error => {
                  console.error('Erro ao adicionar denúncia', error);
                });
              }
            }
          ]
        });
    
        await alert.present();
      }
    
      // async presentAlertEdit(id: string) {
      //   const alert = await this.alertController.create({
      //     header: 'Editar Denúncia',
      //     inputs: [
      //       {
      //         name: 'rua',
      //         type: 'text',
      //         placeholder: 'Rua'
      //       },
      //       {
      //         name: 'bairro',
      //         type: 'text',
      //         placeholder: 'Bairro',
      //         attributes: {
      //           maxlength: 20
      //         }
      //       },
      //       {
      //         name: 'cidade',
      //         type: 'text',
      //         placeholder: 'Cidade',
      //         attributes: {
      //           maxlength: 20
      //         }
      //       },
      //       {
      //         name: 'numero',
      //         type: 'number',
      //         placeholder: 'Número',
      //         min: 1,
      //         max: 100
      //       },
      //       {
      //         name: 'date',
      //         type: 'date',
      //         min: '2023-01-01',
      //         max: '2024-12-30'
      //       },
      //       {
      //         name: 'obs',
      //         type: 'textarea',
      //         placeholder: 'Observação'
      //       }
      //     ],
      //     subHeader: 'Atualizar Dados',
      //     buttons: [
      //       {
      //         text: 'Cancelar',
      //         role: 'cancel',
      //         cssClass: 'secondary'
      //       },
      //       {
      //         text: 'OK',
      //         handler: (data) => {
      //           this.api['updateData'](id, data).subscribe((response: any) => {
      //             console.log('Denúncia atualizada', response);
      //             // Adicione qualquer lógica adicional após atualizar a denúncia
      //           }, (error: any) => {
      //             console.error('Erro ao atualizar denúncia', error);
      //           });
      //         }
      //       }
      //     ]
      //   });
    
      //   await alert.present();
      // }
    
      deleteDenuncia(id: string) {
        this.api.deleteData(id).subscribe((response: any) => {
          console.log('Denúncia excluída', response);
          // Adicione qualquer lógica adicional após excluir a denúncia
        }, (error: any) => {
          console.error('Erro ao excluir denúncia', error);
        });
      }
    
    
    
    
      
      
    
    
      
        async presentToastVazio(){
          const toast = await this.toastontroller.create({
            message: "Preencha os Campos",
            duration:3200,
            
          });
          toast.present();
        }
    
    
    
}