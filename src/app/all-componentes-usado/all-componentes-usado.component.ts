import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FotoService } from '../foto.service';
@Component({
  selector: 'app-all-componentes-usado',
  templateUrl: './all-componentes-usado.component.html',
  styleUrls: ['./all-componentes-usado.component.scss'],
})
export class AllComponentesUsadoComponent  implements OnInit {
  fotoPerfil = [
    {
      nome: "Paulo",
      webviewPath: "https://tse1.explicit.bing.net/th?id=OIP.zP1mlHnV1bpgODW8gvQSFQHaIP&pid=Api&P=0&h=180",
    }]

  @Input() header: any;
  
  @Input() functionVoltar: () => void = () => {};
  @Input() tirarFoto: () => void = () => {};
  @Input() mostrarComponente: boolean = true;
  // @Input() fotoPerfil: string = 'assets/default-avatar.jpg';
  @Input() nomeUsuario: string = '';
list: any;
fotoservice: any;
  constructor(
    
  ) { }

  ngOnInit() {}

  imageUrl: string = "https://exemplo.com/caminho/para/imagem.jpg";
  alterarImagemNova() {
    this.imageUrl = "https://exemplo.com/nova/imagem.jpg";
  }



  async tirarFotoP() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
      source: CameraSource.Camera,
    });

    
  }  
  

}
