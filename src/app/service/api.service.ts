import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

 public url = 'http://localhost:3000/'
  denuncias: any[] = [];

  constructor( public http: HttpClient,
    

   ){ }
   ngOnInit() {
    this.getData();
    //
  }

    getData(){
      return this.http.get(`${this.url}denuncias`)
    }
    
    postData(denuncias: any): Observable<any> {
      return this.http.post(`${this.url}denuncias`, denuncias);
    }
  
    putData(denuncia:any ): Observable<any> {
      return this.http.put(`${this.url}denuncias/${denuncia}`,denuncia);
    }
  
    // deleteData(id: string): Observable<any> {
    //   return this.http.delete(`${this.url}denuncias/${id}`);
    // }

    
   
    updateData(id: string, data: any): Observable<any> {
      return this.http.put(`${this.url}denuncias/${id}`, data);
    }

    //cadastro usuario
    postUser(user: any): Observable<any> {
      return this.http.post(`${this.url}user`, user);
    }

    getUser(){
      return this.http.get(`${this.url}user`)
    }
    deleteData(id: string, data: { created_by: string }): Observable<any> {
      return this.http.delete(`/denuncias/${id}`, {
        body: data // Passando o `created_by` no corpo da requisição
      });
    }
    

    // getDenuncias(): Observable<any> {
    //   return this.http.get('/denuncias');
    // }
  
    // deleteDenuncia(id: string, created_by: string): Observable<any> {
    //   return this.http.delete(`/denuncias/${id}`, { body: { created_by } });
    // }
  
    // updateDenuncia(id: string, data: any): Observable<any> {
    //   return this.http.put(`/denuncias/${id}`, data);
    // }
    
    

    
  }

    
   
