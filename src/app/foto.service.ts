
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  
[x: string]: any;
  fotosPorDenuncia: Map<number, Foto[]> = new Map<number, Foto[]>();
  

  public fotos : Foto[] = [];
  
  public photoSubject = new BehaviorSubject<string | null>(null);
  photo$ = this.photoSubject.asObservable();

  setPhoto(photo: string) {
    this.photoSubject.next(photo);
  }

  getPhoto() {
    return this.photoSubject.value;
  }

  public fotoPerfil = [
      {
        nome: "Paulo",
        webviewPath: "https://tse1.explicit.bing.net/th?id=OIP.zP1mlHnV1bpgODW8gvQSFQHaIP&pid=Api&P=0&h=180",
      }]

  

  constructor() { 
    
  }
  

public getFotosPorDenuncia(denunciaIndex: number): Foto[] {
  return this.fotosPorDenuncia.get(denunciaIndex) || [];
}

async tirarFoto(denunciaIndex: number) {
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    quality: 100,
    source: CameraSource.Camera,
  });

  const fotos = this.fotosPorDenuncia.get(denunciaIndex) || [];
  fotos.unshift({
    webviewPath: capturedPhoto.webPath ?? ' ',
  });
  this.fotosPorDenuncia.set(denunciaIndex, fotos);
}


public deleteFoto(denunciaIndex: number, fotoIndex: number) {
  const fotos = this.fotosPorDenuncia.get(denunciaIndex) || [];
  fotos.splice(fotoIndex, 1);
  this.fotosPorDenuncia.set(denunciaIndex, fotos);
}

}




export interface Foto{
  webviewPath:string;
  bases64?:string;
  
} 