import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { Foto, FotoService } from '../foto.service';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';


defineCustomElements(window);
@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage  {
[x: string]: any;

 
  data: any[] = [];
  denuncias: any[] = [];
  constructor(public navCtrl : NavController,
     public taskService:TaskService,
     public fotoService:FotoService,
     public alertController: AlertController,
     public toastController: ToastController,
     public actionsheetController: ActionSheetController,
     public loadingCtrl: LoadingController,
     public toastontroller:ToastController,
     public api:ApiService,
     public http: HttpClient,
     
     
     ) {
       this.getData();
  }
  
  getData() {
    this.api.getData().subscribe(
      (      body: any) => {
        
      console.log(body);
      this.data = body
    }, (error: any) => {
      console.error('Erro ao obter dados', error);
    });
  }


 
  Voltarhome() {
    this.navCtrl.navigateBack('home')
  }
  async loadingAdd() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde ...',
      duration: 3000,
      
    }
    );

    loading.present();
    await new Promise(resolve => setTimeout(resolve, 1000)); 
  }
  async CadastroDenuncia() {
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
              this.loadCadastro();
              console.log('Denúncia adicionada', response);
              
            }, error => {
              console.error('Erro ao adicionar denúncia', error);
            });
          }
        }
      ]
    });

    await alert.present();
  }


  async EditaDenuncia(denuncia: any) {
    try {
      const alert = await this.alertController.create({
        header: 'Editar Denúncia',
        inputs: [
          {
            name: 'rua',
            type: 'text',
            placeholder: 'Rua',
            value: denuncia.rua,
          },
          {
            name: 'bairro',
            type: 'text',
            placeholder: 'Bairro',
            value: denuncia.bairro,
            attributes: {
              maxlength: 20,
            },
          },
          {
            name: 'cidade',
            type: 'text',
            placeholder: 'Cidade',
            value: denuncia.cidade,
            attributes: {
              maxlength: 20,
            },
          },
          {
            name: 'numero',
            type: 'number',
            placeholder: 'Número',
            value: denuncia.numero,
          },
          {
            name: 'date',
            type: 'date',
            value: denuncia.Dia,
            min: '2023-01-01',
            max: '2024-12-30',
          },
          {
            name: 'obs',
            type: 'textarea',
            placeholder: 'Observação',
            value: denuncia.obs,
          },
        ],
        subHeader: 'Atualizar Dados',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'OK',
            handler: (data) => {
              const updatedDenuncia = {
                id: denuncia.id, // Ensure the ID is included
                rua: data.rua,
                bairro: data.bairro,
                cidade: data.cidade,
                numero: parseInt(data.numero, 10), // Garantir que seja número
                Dia: data.date, // Converter string para Date
                obs: data.obs,
              };
              this.updateDenuncia(updatedDenuncia);
            },
          },
        ],
      });
      await alert.present();
    } catch (error) {
      console.error('Erro ao carregar denúncia', error);
    }
  }
  
  // async presentAlertEdit(id: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Editar Denúncia',
  //     inputs: [
  //       {
  //         name: 'rua',
  //         type: 'text',
  //         placeholder: 'Rua',
  //         value:id
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
  //           this.api.putData(id, data).subscribe((response: any) => {
  //             this.updateDenuncia(data);
  //             console.log('Denúncia atualizada', response);
              
  //           }, (error: any) => {
  //             console.error('Erro ao atualizar denúncia', error);
  //           });
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // updateDenuncia(denuncia:any) {
  //   this.api.updateData(denuncia).subscribe((response: any) => {
  //     this.loadingAtualizando();
  //     this.getData();
  //     console.log('Denúncia Atualizada com Sucesso', response);
  //     // Adicione qualquer lógica adicional após excluir a denúncia
  //   }, (error: any) => {
  //     console.error('Erro ao atualizar denúncia', error);
  //   });
  // }
  updateDenuncia(denuncia: any) {
    this.api.updateData(denuncia.id, denuncia).subscribe(
      (response: any) => {
        this.loadingAtualizando();
        this.getData();
        console.log('Denúncia Atualizada com Sucesso', response);
        // Adicione qualquer lógica adicional após atualizar a denúncia
      },
      (error: any) => {
        console.error('Erro ao atualizar denúncia', error);
      }
    );
  }

DeleteDenuncia(id:string) {
  this.api.deleteData(id).subscribe(
    (response: any) => {
      this.loadingExcluir();
      console.log('Denúncia excluída', response);
      this.getData();
    },
    (error: any) => {
      console.error('Erro ao excluir denúncia', error);
    }
  );
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
        duration: 2200,
      });
  
      loading.present();
      this.getData();
     
      
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


    

  async ActionExcluir() {
  const actionSheet = await this.actionsheetController.create({
    header: 'Deseja Excluir esta Denuncia',
    buttons: [
      {
        text: 'Deletar',
        icon: 'trash',
        handler: async () => {await new Promise(resolve => setTimeout(resolve, 2200)),
        
        this.getData();
          
        }

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
async loadCadastro() {
  const loading = await this.loadingCtrl.create({
    message: 'Cadastrando..',
    duration: 900,  // Defina o tempo desejado em milissegundos
  });

  loading.present();

  // Aguarde o tempo definido antes de chamar this.functionhome()
  await new Promise(resolve => setTimeout(resolve, 1000));  // Aguarda 1 segundo
  this.getData();
  
  
}


}






