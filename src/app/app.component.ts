

import { Component } from '@angular/core';
import { ApiService } from './service/api.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  [x: string]: any;
  data: any[] = [];
  constructor(private apiService: ApiService
  
  ) {
   
  }
  getData() {
    this.apiService.getData().subscribe(
      (respostaok: any) => {
        console.log(respostaok);
        this['data'] = respostaok;
      },
      (error: any) => {
        console.error('Erro ao obter dados', error);
      }
    );
  }

}
