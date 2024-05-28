import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { Foto, FotoService } from '../foto.service';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { RouterLink } from '@angular/router';


defineCustomElements(window);
@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage  {
[x: string]: any;

// public fotos : Foto[] = [];

  public tasks!: Observable<any[]>;

 

  
  constructor(public navCtrl : NavController,
     public taskService:TaskService,
     public fotoService:FotoService,
     public alertController: AlertController,
     public toastController: ToastController,
     public actionsheetController: ActionSheetController,
     public loadingCtrl: LoadingController,
     public toastontroller:ToastController,
     
     
     ) {
   
    
  }
  

  ngOnInit(){
   
  }
  Voltarhome() {
    this.navCtrl.navigateBack('home')
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
                this.presentToast();
                this.presentAlertAdd();
             
              
             }
            }

          }

      ],//['Enviar'],
    });

    await alert.present();
  }


  
  async presentToast(){
      const toast = await this.toastController.create({
        message: "Preencha os Campos",
        duration:3200,

      });
      toast.present();
    }
    async loadingExcluir() {
      const loading = await this['loadingCtrl'].create({
        message: 'Excluindo ...',
        duration: 3200,
      });
  
      loading.present();
     
      
    }
      
  async presentAlertDelete(index : number) {
    const alert = await this['alertController'].create({
      header: 'Excluir denuncia',
      message:'Deseja Realmente Exluir essa Denuncia',
      // subHeader: 'Envio de Dados',
      // //message: 'This is an alert!',
      buttons:[
          {
            text: 'cancelar',
            role: 'cancel',
          

          },{
            text:'Excluir',
            
            handler:async () => { await new Promise(resolve => setTimeout(resolve, 3000));
                this.loadingExcluir(),
                this.taskService.deletarDenuncia(index);
            }
             
          }
            
        
      ],//['Enviar'],
    });

    await alert.present();
  }

  async loadingAtualizando() {
    const loading = await this.loadingCtrl.create({
      message: 'Atualizando ...',
      duration: 3200,
    });

    loading.present();
  }
 
  async presentAlertAtualizar(index:number ,task: any) {
    const alert = await this.alertController.create({
      header: 'Atualizar Dados',
      inputs:[
        {
          name: 'rua',
          type: 'text',
          placeholder:'Rua',
          value: task.rua


        },
        {
          name:'address',
          placeholder: 'Bairro',
          attributes: {
            maxlength: 20,
          },
          value:task.address
        },
        {
          name:'numero',
          type: 'number',
          placeholder: 'Numero',
          min: 1,
          max: 100,
          value:task.numero
        },
        {
          name:'obs',
          type: 'textarea',
          placeholder: 'Observação',
          value:task.obs
        },
        {
          name:'date',
          type:'date',
          min: '2024-01-01', 
          max:'2024-12-30',
          value:task.date.getFullYear() + "-"+ 
          ((task.date.getMonth()+1) <11? "0" + task.date.getMonth()+1:task.date.getMonth()+1)+"-"+(task.date.getDay()+1 <10? "0" + task.date.getDay():task.datetask.date.getDay())
        },
      ],
      subHeader: 'Envio de Dados',
      //message: 'This is an alert!',
      buttons:[
          {
            text: 'cancelar',
            role: 'cancel',
            cssClass: 'secondary',

          }
          ,{
            text:'OK!',
            handler:async(alert) =>{
             if (alert.rua.trim() !== "")
             this.loadingAtualizando(),
             await new Promise(resolve => setTimeout(resolve, 3500)),
             this.taskService.atualizarDenuncia(index,alert.rua,alert.address,alert.numero,alert.obs,alert.date,);
             
             else{
                this.presentToast();
                
                
             }
            }
          }
      ],
    });

    await alert.present();
  }


    

  async presentActionSheet(i: number, denunciaIndex: any) {
  const actionSheet = await this.actionsheetController.create({
    header: 'Deseja Excluir esta foto',
    buttons: [
      {
        text: 'Deletar',
        icon: 'trash',
        handler: async () => {await new Promise(resolve => setTimeout(resolve, 3200)),
          this.loadingExcluir(),
          this.fotoService.deleteFoto(i,denunciaIndex);
        },
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      },
    ],
  });

  await actionSheet.present();
}

async showSair() {
  const loading = await this.loadingCtrl.create({
    message: 'Saindo..',
    duration: 1000,  // Defina o tempo desejado em milissegundos
  });

  loading.present();

  // Aguarde o tempo definido antes de chamar this.functionhome()
  await new Promise(resolve => setTimeout(resolve, 1000));  // Aguarda 1 segundo

  this.functionhome();
  
}

functionhome() {
    
  this.navCtrl.navigateForward('home')
}

}






