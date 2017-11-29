import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';

//Rutas
import { routing, appRoutingProviders } from './app.routing';

//Servicios
import { AuthService } from './services/auth.service';
import { KeysPipe } from './components/pipes_keys';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { LoginComponent } from './components/login.component';
import { AuthguardGuard } from './authguard.guard';
import { HeaderComponent } from './components/header.component';

import { RestaurantesListComponent } from './components/restaurantes/restaurantes-list.component';
import { RestaurantesAddComponent } from './components/restaurantes/restaurantes-add.component';
import { RestaurantesDetailComponent } from './components/restaurantes/restaurantes-detail.component';
import { RestaurantesEditComponent } from './components/restaurantes/restaurantes-edit.component';
import { RestaurantesImportDatasetComponent } from './components/restaurantes/restaurantes-import-dataset.component';


import { UsuariosAddComponent } from './components/usuarios/usuarios-add.component';
import { UsuariosDetailComponent } from './components/usuarios/usuarios-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    HeaderComponent,
    RestaurantesListComponent,
    RestaurantesAddComponent,
    RestaurantesDetailComponent,
    RestaurantesEditComponent,
    RestaurantesImportDatasetComponent,
    UsuariosAddComponent,
    UsuariosDetailComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2UploaderModule
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthguardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
