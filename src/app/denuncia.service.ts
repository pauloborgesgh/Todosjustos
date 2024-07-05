import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private apiUrl = 'http://localhost:3000/denuncias';

  constructor(private http: HttpClient) {}

  updateDenuncia(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteDenuncia(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addDenuncia(denuncia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, denuncia, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
