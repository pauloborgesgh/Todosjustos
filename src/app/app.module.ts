
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterLink} from '@angular/router';
import { UserService } from './user.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SqliteService } from './sqlite.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskService } from './task.service';
import { FotoService } from './foto.service';
import { AllComponentesUsadoComponent } from './all-componentes-usado/all-componentes-usado.component';
import { Storage } from '@ionic/storage';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent,AllComponentesUsadoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,RouterLink,RouterLinkWithHref,HttpClientModule],
 
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,FotoService,TaskService,SqliteService,AllComponentesUsadoComponent,Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
