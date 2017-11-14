import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { LoginComponent } from './components/login.component';
import { AuthguardGuard } from './authguard.guard';
import { RestaurantesListComponent } from './components/restaurantes/restaurantes-list.component';
import { RestaurantesAddComponent } from './components/restaurantes/restaurantes-add.component';
import { RestaurantesDetailComponent } from './components/restaurantes/restaurantes-detail.component';
import { RestaurantesEditComponent } from './components/restaurantes/restaurantes-edit.component';
import { UsuariosAddComponent } from './components/usuarios/usuarios-add.component';
import { UsuariosDetailComponent } from './components/usuarios/usuarios-detail.component';

const appRoutes : Routes = [
	{path: '', component: HomeComponent},//path vacío a la pagina principal
	{path: 'home', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'restaurantes', canActivate: [AuthguardGuard], component: RestaurantesListComponent},
	{path: 'crear-restaurantes', canActivate: [AuthguardGuard], component: RestaurantesAddComponent},
	{path: 'restaurantes/:id', canActivate: [AuthguardGuard], component: RestaurantesDetailComponent},
	{path: 'editar-restaurantes/:id', canActivate: [AuthguardGuard], component: RestaurantesEditComponent},
	{path: 'crear-usuarios', component: UsuariosAddComponent},
	{path: 'usuario', canActivate: [AuthguardGuard], component: UsuariosDetailComponent},

	{path: '**', component: ErrorComponent}//siempre debe ser la última, es cuando no existe la ruta

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//recibe un array de rutas para estableces ese array de rutas con la configuración de angular
/* esto se carga en el app module */