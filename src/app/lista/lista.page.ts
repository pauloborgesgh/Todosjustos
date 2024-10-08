import { TaskService } from './../task.service';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';


import { defineCustomElements } from '@ionic/pwa-elements/loader';

import {  FotoService } from '../foto.service';


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

created_by : string | null ='';
username = localStorage.getItem('username');

 
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
  
  getData(queryParams?: any) {
    let url = 'https://app-api-prd.up.railway.app/denuncias';

    if (queryParams) {
        const queryStrings = Object.keys(queryParams)
            .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        url += `?${queryStrings}`;
    }

    this.http.get(url).subscribe(
        (body: any) => {
            console.log(body);
            this.data = body;
        },
        (error: any) => {
            console.error('Erro ao obter dados', error);
        }
    );
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
                placeholder: 'Rua',
            },
            {
                name: 'bairro',
                type: 'text',
                placeholder: 'Bairro',
                attributes: {
                    maxlength: 20,
                },
            },
            {
                name: 'cidade',
                type: 'text',
                placeholder: 'Cidade',
                attributes: {
                    maxlength: 15,
                },
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
                max: '2024-12-30',
            },
            {
                name: 'obs',
                type: 'textarea',
                placeholder: 'Observação',
            }
        ],
        subHeader: 'Envio de Dados',
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
            },
            {
                text: 'OK',
                handler: (denuncia) => {
                    // Adicionando o campo `created_by` com o valor do localStorage
                    denuncia.created_by = this.created_by;

                    this.api.postData(denuncia).subscribe(
                        (response) => {
                            console.log('Denúncia adicionada', response);
                            this.loadingAdd();
                            //this.DenunciaEnviada();
                        },
                        (error) => {
                            console.error('Erro ao adicionar denúncia', error);
                        }
                    );
                },
            },
        ],
    });

    await alert.present();
}


updateDenuncia(denuncia: any) {
  this.api['updateData'](denuncia.id, denuncia).subscribe(
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


  
  

async deleteDenuncia(id: string) {
  const IdUsuarioCriado = localStorage.getItem('userId'); // ID do usuário logado

  // Exibe um alerta de confirmação antes de deletar
  const alert = await this.alertController.create({
    header: 'Deletar Denúncia',
    subHeader: 'Confirmação de Exclusão',
    message: 'Você realmente deseja deletar esta denúncia?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Deletar',
        handler: async () => {
          try {
            // Verifica se o usuário está autenticado
            if (!IdUsuarioCriado) {
              console.error('Erro: usuário não autenticado.');
              return;
            }

            // Chama a API para deletar a denúncia
            const response = await this.api.deleteeData(`${id}`, { created_by: IdUsuarioCriado }).toPromise();

            if (response && response.message === 'Denúncia removida com sucesso!') {
              console.log('Denúncia deletada com sucesso', response);
              this.getData(); // Atualiza a lista de denúncias após a exclusão

              // Exibe alerta de sucesso
              const successAlert = await this.alertController.create({
                header: 'Sucesso',
                message: 'Denúncia deletada com sucesso!',
                buttons: ['OK'],
              });
              await successAlert.present();
            } else {
              // Exibe alerta de erro caso a denúncia não tenha sido deletada
              const errorAlert = await this.alertController.create({
                header: 'Erro!',
                message: response?.message || 'Não foi possível deletar a denúncia.',
                buttons: ['OK'],
              });
              await errorAlert.present();
            }
          } catch (error) {
            console.error('Erro ao deletar denúncia', error);

            // Exibe alerta em caso de erro
            const errorAlert = await this.alertController.create({
              header: 'Erro!',
              message: 'Ocorreu um erro ao deletar a denúncia.',
              buttons: ['OK'],
            });
            await errorAlert.present();
          }
        },
      },
    ],
  });

  await alert.present();
}
async EditaDenuncia(denuncia: any) {
  const userId = localStorage.getItem('userId');

  // Verifica se o userId do localStorage é igual ao created_by da denúncia
  if (userId !== denuncia.created_by) {
    const toast = await this.toastontroller.create({
      message: 'Você não tem permissão para editar esta denúncia.',
      duration: 3200,
      color: 'danger',
    });
    toast.present();
    return; // Impede a edição
  }

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
          value: denuncia.Dia.split('T')[0], // Converte para YYYY-MM-DD
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
            // Converte a data para o formato ISO-8601 DateTime
            const diaDateTime = `${data.date}T00:00:00Z`;

            const updatedDenuncia = {
              rua: data.rua,
              bairro: data.bairro,
              cidade: data.cidade,
              numero: parseInt(data.numero, 10),
              Dia: diaDateTime, // Adiciona a parte de hora e fuso horário
              obs: data.obs,
            };

            // Chama a API para atualizar a denúncia
            this.api.editDenuncia(denuncia.id, updatedDenuncia).subscribe(
              
              (response) => {
                console.log('Denúncia atualizada com sucesso', response);
                this.getData();
                this.loadingAtualizando();
                // Adicione qualquer lógica adicional após a atualização
              },
              (error) => {
                console.error('Erro ao atualizar denúncia', error);
              }
            );
          },
        },
      ],
    });
    await alert.present();
  } catch (error) {
    console.error('Erro ao carregar denúncia', error);
  }
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
      message: 'Atualizando Dados ...',
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






