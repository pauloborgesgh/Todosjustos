
import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemOptions, LoadingController, NavController,Platform, ToastController } from '@ionic/angular';


import { ActionSheetController } from '@ionic/angular';
import { Foto, FotoService } from '../foto.service';
import { TaskService } from '../task.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from '../service/api.service';




@Component({
  selector: 'app-fazerdenuncia',
  templateUrl: './fazerdenuncia.page.html',
  styleUrls: ['./fazerdenuncia.page.scss'],
  
})
export class FazerdenunciaPage {
[x: string]: any;







   constructor(
    public api:ApiService,
    public actionsheetController :ActionSheetController,
    public navCtrl:NavController,
    public plataform:Platform ,
    public alertController: AlertController,
    public taskService:TaskService,
    public toastontroller:ToastController,
    public fotoService:FotoService,
    public loadingCtrl: LoadingController,
   

  
    ) {
      this['getDenuncia']();
     }
     getDenuncia(){
      this.api['getDenuncia']().subscribe((api: any) => {
        console.log(api);
        
      })
     }
    //  postData() {
      
    //   this.api.postData().subscribe(response => {
    //     console.log('Resposta do servidor:', response);
    //   }, error => {
    //     console.error('Erro na requisição:', error);
    //   });
    // }


  functionVoltar(){
    this.navCtrl.navigateRoot('menu');
  }
  functioncNext(){
    this.navCtrl.navigateForward('info')
  }
  functioncNextLista(){
    this.navCtrl.navigateForward('lista')
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
          name: 'numero',
          type: 'number',
          placeholder: 'Número',
          min: 1,
          max: 100
        },
        {
          name: 'date',
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
          handler: (data) => {
            if (
              data.rua !== "" &&
              data.bairro !== "" &&
              data.numero !== "" &&
              data.date !== "" &&
              data.obs !== ""
            ) {
              const taskData = {
                rua: data.rua,
                address: data.bairro,
                numero: data.numero,
                date: data.date,
                obs: data.obs,
                done: false // Este campo pode ser opcional dependendo da sua API
              };

              this.taskService['postData'](taskData).subscribe(
                (                response: any) => {
                  console.log('Dados enviados com sucesso:', response);
                  this.functioncNextLista(); // Chame sua função para prosseguir
                },
                (                error: any) => {
                  console.error('Erro ao enviar os dados:', error);
                  this['presentToastError'](); // Exibe um toast para o erro
                }
              );
            } else {
              this.presentToastVazio(); // Exibe um toast para campos vazios
            }
          }
        }
      ]
    });

    await alert.present();
  }

  


  
    async presentToastVazio(){
      const toast = await this.toastontroller.create({
        message: "Preencha os Campos",
        duration:3200,
        
      });
      toast.present();
    }
      

  async Campo_Vazio() {
      
    const alert = await this['alertController'].create({
      header: 'Campos Vazio',
     buttons: ['OK']
    });
    await alert.present();
  }
  functionhome() {
    this.navCtrl.navigateBack('home')
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

  this['fotoPerfil'][0].webviewPath = capturedPhoto.webPath ?? ' ';
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