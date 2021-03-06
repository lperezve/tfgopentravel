import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Rutas
import { routing, appRoutingProviders } from './app.routing';

//Servicios
import { AuthService } from './services/auth.service';

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
import { RestaurantesImportCSVComponent } from './components/restaurantes/restaurantes-import-csv.component';
import { RestaurantesImportJSONComponent } from './components/restaurantes/restaurantes-import-json.component';


import { UsuariosAddComponent } from './components/usuarios/usuarios-add.component';
import { UsuariosDetailComponent } from './components/usuarios/usuarios-detail.component';
import { VerPerfilComponent } from './components/usuarios/ver-perfil.component';
import { UsuariosEditComponent } from './components/usuarios/usuarios-edit.component';
import { TareasPendientesComponent } from './components/usuarios/admin-tareas-pendientes.component';

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
    RestaurantesImportCSVComponent,
    RestaurantesImportJSONComponent,
    UsuariosAddComponent,
    UsuariosDetailComponent,
    VerPerfilComponent,
    UsuariosEditComponent,
    TareasPendientesComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    routing,
    Ng2UploaderModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYoHnjktyRL65cneiuowyOExudf0MwUSg'
      }),
    CarouselModule.forRoot(),
    ToastModule.forRoot()

  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthguardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
