import {  Injectable } from '@angular/core';


import { AlertController, NavController } from '@ionic/angular'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
[x: string]: any;
 username = localStorage.getItem('username');

  
  public userProfileSubject = new BehaviorSubject<any>({});
  userProfile$ = this.userProfileSubject.asObservable();

  setUserProfile(profile: any) {
    this.userProfileSubject.next(profile);
  }

  getUserProfile() {
    return this.userProfileSubject.value;
  }
  public getUsers(): User[] {
    return this.users;
  }
 
  

  public users: User[] = [];
  
  public cacheKey = 'UserCache';
  
  created_by = localStorage.getItem('userId');
  
  constructor(
    public alertController: AlertController,
    public navCtrl : NavController,
    ) {
    // Recupere os dados do localStorage durante a inicialização do serviço
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      this.users = JSON.parse(cachedData);
    }
  }
  public functionSair(){
    this.navCtrl.navigateBack('home')
  }
  
  public addUsuario(nome :string ,email: string, cpf:number ,senha: string, repetir_senha: string) {
    let user: User;

    if (email !== '') {
      user = { nome,email,cpf, senha, repetir_senha };
      if (senha == repetir_senha) {
        // Adicione o usuário à lista
        this.users.push(user);
        // Salve a lista atualizada no localStorage
        this.saveUsersToLocalStorage();
        // Exiba um alerta
        this.LoginAlerta();
      }else{
        this.naoConfere();
      }
    }
  }

  private saveUsersToLocalStorage() {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.users));
  }

  async LoginAlerta() {
    const alert = await this.alertController.create({
      header: 'Cadastro Criado com Sucesso',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async naoConfere() {
    const alert = await this.alertController.create({
      header: 'Senha não confere',
      buttons: ['OK'],
    });

    await alert.present();
  }
  getEmailAtual(): string {
    return this['emailAtual'];
  }
}





export interface User {
  nome:string;
  email: string;
  cpf:number;
  senha: string;
  repetir_senha: string;
}

