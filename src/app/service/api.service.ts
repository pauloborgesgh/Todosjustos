import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

 public url:   String = 'http://localhost:3000/'

  constructor( public http: HttpClient,
    

   ){ }
   ngOnInit() {
    this.getData();
   // this.postData();
  }

    getData(){
      return this.http.get(`${this.url}denuncias`)
    }

    postData(taskData: any): Observable<any> {
      return this['httpClient'].post(this.url, taskData);
    }
   
}
