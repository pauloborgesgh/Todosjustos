import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiService } from './../service/api.service';
import { TaskService } from './../task.service';
import { FotoService } from './../foto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  [x: string]: any;
  header: any;
  username: string | null ='';
  created_by:string | null = '';

  constructor(
    public navCtrl: NavController,
    public plataform: Platform,
    public alertController: AlertController,
    public userservice: UserService,
    public toastontroller: ToastController,
    public fotoservice: FotoService,
    public router: Router,
    public loadingCtrl: LoadingController,
    public api: ApiService,
    public taskService: TaskService
  ) {}

  ngOnInit() {
    // Pegando o username do localStorage
    this.username = localStorage.getItem('username');
    this.created_by = localStorage.getItem('userId');
    if (this.username) {
      console.log('Username:', this.username);
      console.log('created_by :', this.created_by);
    } else {
      console.log('Nenhum username encontrado no localStorage.');
    }
  }

  functioDenuncia() {
    this.navCtrl.navigateForward('fazerdenuncia');
  }

  functionList() {
    this.navCtrl.navigateForward('lista');
  }

  functioninfo() {
    this.navCtrl.navigateForward('info');
  }

  logout() {
    this['authenticationService'].logout().subscribe(
      (data: any) => {
        this.router.navigate(['home']);
      },
      (erro: any) => console.log(erro)
    );
  }

  imageUrl: string = 'https://exemplo.com/caminho/para/imagem.jpg';
  
  alterarImagemNova() {
    this.imageUrl = 'https://exemplo.com/nova/imagem.jpg';
  }

  async tirarFoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
      source: CameraSource.Camera,
    });

    this.fotoservice.fotoPerfil[0].webviewPath = capturedPhoto.webPath ?? ' ';
  }

  functionhome() {
    this.navCtrl.navigateBack('home');
  }

  async AlertaSair() {
    const alert = await this.alertController.create({
      message: 'Deseja Realmente Sair',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sair',
          handler: () => this.functionhome(),
        },
      ],
    });

    await alert.present();
  }

  async showSair() {
    const loading = await this.loadingCtrl.create({
      message: 'Saindo..',
      duration: 1000,
    });
    loading.present();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.functionhome();
  }

  async loadingAdd() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando Denuncia...',
      duration: 2000,
    });

    

    loading.present();
    await new Promise((resolve) => setTimeout(resolve, 3100));
  }
  async DenunciaEnviada() {
    const loading = await this.loadingCtrl.create({
      message: 'Denuncia Feita',
      duration: 2000,
    });

    loading.present();
    await new Promise((resolve) => setTimeout(resolve, 2100));
  }

  async presentAlertAdd() {
    const alert = await this.alertController.create({
        header: 'Fazer Denúncia',
        inputs: [
            {
                name: 'rua',
                type: 'text',
                placeholder: 'Rua',
            },
            {
                name: 'bairro',
                type: 'text',
                placeholder: 'Bairro',
                attributes: {
                    maxlength: 20,
                },
            },
            {
                name: 'cidade',
                type: 'text',
                placeholder: 'Cidade',
                attributes: {
                    maxlength: 15,
                },
            },
            {
                name: 'numero',
                type: 'number',
                placeholder: 'Número',
            },
            {
                name: 'Dia',
                type: 'date',
                min: '2023-01-01',
                max: '2024-12-30',
            },
            {
                name: 'obs',
                type: 'textarea',
                placeholder: 'Observação',
            }
        ],
        subHeader: 'Envio de Dados',
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
            },
            {
                text: 'OK',
                handler: (denuncia) => {
                    // Adicionando o campo `created_by` com o valor do localStorage
                    denuncia.created_by = this.created_by;

                    this.api.postData(denuncia).subscribe(
                        (response) => {
                            console.log('Denúncia adicionada', response);
                            this.loadingAdd();
                            //this.DenunciaEnviada();
                        },
                        (error) => {
                            console.error('Erro ao adicionar denúncia', error);
                        }
                    );
                },
            },
        ],
    });

    await alert.present();
}


  // deleteDenuncia(id: string) {
  //   this.api.deleteData(id).subscribe(
  //     (response: any) => {
  //       console.log('Denúncia excluída', response);
  //       // Adicione qualquer lógica adicional após excluir a denúncia
  //     },
  //     (error: any) => {
  //       console.error('Erro ao excluir denúncia', error);
  //     }
  //   );
  // }

  async presentToastVazio() {
    const toast = await this.toastontroller.create({
      message: 'Preencha os Campos',
      duration: 3200,
    });
    toast.present();
  }
}
