import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';


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
    // public firestore :AngularFirestore,
    // public db:SqliteService,

 
    
    ) { }

  ngOnInit() {
  }
  function_Voltar(){
    this.navCtrl.navigateBack('home')
  }
  async presentAlertAdd() {
    const alert = await this.alertController.create({
      header: 'Cadasto Usuario',
      inputs:[
        {
          name: 'nome',
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
            max: 11,
          }
      
        },
        {
          name:'senha',
          type: 'password',
          placeholder: 'Senha',
          min: 6,
          max: 10,
        },
        {
          name:'repetir_senha',
          type: 'password',
          placeholder: 'Repitir senha',
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
            
            handler:(alert:any) =>{

              
            if (alert.name != '',alert.user != '' ,alert.email != '' ,alert.cpf!='',alert.senha != '' ,alert.repetir_senha !=''){
            
            this.userService.addUsuario(
            alert.nome,
            alert.email,
            alert.cpf,
            alert.senha,
            alert.repetir_senha),
            this.LoginAlerta();
            this.function_Voltar();
            console.log();
           
            }
          
            else{
              
              //this.presentAlertAdd();
              this.Campo_Vazio();
             }  
             
            
            

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
    // public addFireBasee(record : Form){
    //   return this.firestore.collection(this.collectionName).add(record)
  
    // }
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


