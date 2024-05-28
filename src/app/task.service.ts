import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular/providers/loading-controller';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  [x: string]: any;
  public apiUrl = 'http://localhost:3000/api/denuncias';
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

  public denunciaIndex(rua:string,address:string,numero:string,obs:string,date:string,){
    let task : Task;
    if(date != ''){
      date = date.replace(" -" ,"/");
      task = {rua:rua,address:address,numero:numero,obs:obs,date: new Date(date),done:false,};
    }else
    task = {rua:rua,address:address,numero:numero,obs:obs,date: new Date(date),done:false,};
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  public atualizarDenuncia(index: number, rua:string,address:string,numero:string,obs:string,date:string){
    let task:Task = this.tasks[index];
    task.rua = rua;
    task.address = address;
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
  address:string;
  numero: string;
  obs:string;
  done?: boolean;
  date:Date;
  
}  