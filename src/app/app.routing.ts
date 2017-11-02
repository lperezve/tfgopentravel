import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { RestaurantesListComponent } from './components/restaurantes-list.component';
import { RestaurantesAddComponent } from './components/restaurantes-add.component';
import { RestaurantesDetailComponent } from './components/restaurantes-detail.component';
import { RestaurantesEditComponent } from './components/restaurantes-edit.component';

const appRoutes : Routes = [
	{path: '', component: HomeComponent},//path vacío a la pagina principal
	{path: 'home', component: HomeComponent},
	{path: 'restaurantes', component: RestaurantesListComponent},
	{path: 'crear-restaurantes', component: RestaurantesAddComponent},
	{path: 'restaurantes/:id', component: RestaurantesDetailComponent},
	{path: 'editar-restaurantes/:id', component: RestaurantesEditComponent},

	{path: '**', component: ErrorComponent}//siempre debe ser la última, es cuando no existe la ruta

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//recibe un array de rutas para estableces ese array de rutas con la configuración de angular
/* esto se carga en el app module */