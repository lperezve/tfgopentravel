import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home.component';

const appRoutes : Routes = [
	{path: '', component: HomeComponent},//path vacío a la pagina principal
	{path: 'home', component: HomeComponent},

	{path: '**', component: HomeComponent}//siempre debe ser la última, es cuando no existe la ruta

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//recibe un array de rutas para estableces ese array de rutas con la configuración de angular
/* esto se carga en el app module */