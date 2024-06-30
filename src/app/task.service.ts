import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular/providers/loading-controller';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './service/api.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  [x: string]: any;
  // public apiUrl = 'http://localhost:3000/api/denuncias';
  public tasks : Task[] = [];
  
  public collectionName : string = 'Task';
 
  constructor(
    private HttpClient: HttpClient
  ) { }

  public getTask(): Task[]{
    return this.tasks;
  }
 
  public saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  public denunciaIndex(rua:string,bairro:string,numero:string,obs:string,date:string,){
    let task : Task;
    if(date != ''){
      date = date.replace(" -" ,"/");
      task = {rua:rua,bairro:bairro,numero:numero,obs:obs,date: new Date(date)};
    }else
    task = {rua:rua,bairro:bairro,numero:numero,obs:obs,date: new Date(date)};
    this.tasks.push(task);
    this.saveTasksToLocalStorage(); 
    
    
  }

  public atualizarDenuncia(index: number, rua:string,bairro:string,numero:string,obs:string,date:string){
    let task:Task = this.tasks[index];
    task.rua = rua;
    task.bairro = bairro;
    task.numero =  numero;
    task.obs = obs;
    date = date.replace(" -" ,"/");
    task.date = new Date(date);
    this.tasks.splice(index);
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
    
  }
  
  public async deletarDenuncia(index: number){
    this.tasks.splice(index,1);
    
    

  }

 

}




export interface Task{
  rua: string;
  bairro:string;
  numero: string;
  obs:string;
  date:Date;
  
}  