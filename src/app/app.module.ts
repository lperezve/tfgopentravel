import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Rutas
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { RestaurantesListComponent } from './components/restaurantes-list.component';
import { RestaurantesAddComponent } from './components/restaurantes-add.component';
import { RestaurantesDetailComponent } from './components/restaurantes-detail.component';
import { RestaurantesEditComponent } from './components/restaurantes-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    RestaurantesListComponent,
    RestaurantesAddComponent,
    RestaurantesDetailComponent,
    RestaurantesEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
