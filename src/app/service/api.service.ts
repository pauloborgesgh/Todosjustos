import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

 public url = 'http://localhost:3000/'
  

  constructor( public http: HttpClient,
    

   ){ }
   // eslint-disable-next-line @angular-eslint/contextual-lifecycle
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
  
    // putData(denuncia:any ): Observable<any> {
    //   return this.http.put(`${this.url}denuncias/edi/${denuncia}`,denuncia);
    // }


    

    putData(id: string, data: any): Observable<any> {
      return this.http.put(`${this.url}denuncias/edit/${id}`, data);
    }

    //cadastro usuario
    postUser(user: any): Observable<any> {
      return this.http.post(`${this.url}user`, user);
    }

    getUser(){
      return this.http.get(`${this.url}user`)
    }
    deleteeData(id: string, data: { created_by: string }): Observable<any> {
      return this.http.delete(`http://localhost:3000/denuncias/remove/${id}`, {
        body: data // Passando o `created_by` no corpo da requisição
      });
    }
  
    editDenuncia(id: string, data: any): Observable<any> {
      return this.http.put(`http://localhost:3000/denuncias/edit/${id}`, data);
    }
    
    

    
  }

    
