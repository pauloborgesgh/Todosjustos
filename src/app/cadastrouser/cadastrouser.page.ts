import { User } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { UserService } from '../user.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastrouser',
  templateUrl: './cadastrouser.page.html',
  styleUrls: ['./cadastrouser.page.scss'],
})
export class CadastrouserPage implements OnInit {

  [x: string]: any;
  public collectionName : string = 'User';
  // login = undefined
  // senha = undefined
  // nome = undefined
  // email = undefined
  // cpf= undefined
  // senha = undefined
  // repetir_senha= undefined
  

  constructor(
    public navCtrl:NavController,
    public alertController: AlertController,
    public userService:UserService,
    public toastontroller:ToastController,
    public api:ApiService,
    public http: HttpClient,
    

 
    
    ) { }

    

  ngOnInit() {
    this.presentAlertAdd();
  }
  function_Voltar(){
    this.navCtrl.navigateBack('home')
  }
  async presentAlertAdd() {
    const alert = await this.alertController.create({
      header: 'Cadasto Usuario',
      inputs:[
        {
          name: 'name',
          type: 'text',
          placeholder:'Nome'

        },
        {
          name:'email',
          type:'text',
          placeholder: 'E-mail',
        
        },
        {
          name:'cpf',
          type: 'number',
          placeholder: 'cpf',
          attributes:{ 
           
            max: 11
          }
      
        },
        {
          name:'password',
          type: 'password',
          placeholder: 'Senha',
          min: 6,
          max: 10,
        },
        // {
        //   name:'repetir_senha',
        //   type: 'password',
        //   placeholder: 'Repitir senha',
        //  },
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
            handler: (user) => {
              this.api.postUser(user).subscribe((response: any) => {
              console.log('Cadastro Criado com sucesso ', response);
              this.function_Voltar();
                
              }, (error: any) => {
                console.error('Erro ao criar Cadastro', error);
              });
            }

          }
          

      ],//['Enviar'],
    });

    await alert.present();
  }
  async Campo_Vazio() {
      
    const alert = await this['alertController'].create({
      header: 'Campos Vazio',
      

     buttons: ['OK']
   
     
    });
        
    await alert.present();
  }
    async presentAllert(){
      const toast = await this.toastontroller.create({
        header: "Campo senha não iguais",
        duration:3900,

      });
      toast.present();
    }
   
    async LoginAlerta() {
      
      const alert = await this['alertController'].create({
        header: 'Cadastro Criado com  Sucesso',
        
  
       buttons: ['OK']
     
       
      });
          
  
  
      await alert.present();
    }
    async Senha_difere() {
      
      const alert = await this['alertController'].create({
        header: 'Campos senha invalida',
        
  
       buttons: ['OK']
     
       
      });
          
      await alert.present();
    }




    // SetLogin(valor: undefined){
    //   this.login = valor;
    // }
    // SetSenha(valor: undefined){
    //   this.senha = valor;
    // };


    
    // salvandoCache(){
    //   let cache = {
    //     nome: this.nome,
    //     email: this.email,
    //     cpf:  this.cpf,
    //     senha: this.senha,
    //     repetir_senha :this.repetir_senha,
 
    //   }
    //   localStorage.setItem('cache',JSON.stringify(cache))
    // }
  
  // const setName = async () => {
  //   await Storage.set({
  //     key: 'name',
  //     value: 'Max',
  //   });
  // };
  
  // const checkName = async () => {
  //   const { value } = await Storage.get({ key: 'name' });
  
  //   console.log(`Hello ${value}!`);
  // };
  
  // const removeName = async () => {
  //   await Storage.remove({ key: 'name' });
  // };

  
}


