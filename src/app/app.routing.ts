import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
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
import { RestaurantesImportCSVComponent } from './components/restaurantes/restaurantes-import-csv.component';
import { RestaurantesImportJSONComponent } from './components/restaurantes/restaurantes-import-json.component';

import { UsuariosAddComponent } from './components/usuarios/usuarios-add.component';
import { UsuariosDetailComponent } from './components/usuarios/usuarios-detail.component';
import { VerPerfilComponent } from './components/usuarios/ver-perfil.component';
import { UsuariosEditComponent } from './components/usuarios/usuarios-edit.component';
import { TareasPendientesComponent } from './components/usuarios/admin-tareas-pendientes.component';


const appRoutes : Routes = [
	{path: '', component: HomeComponent},//path vacío a la pagina principal
	{path: 'home', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'restaurantes', component: RestaurantesListComponent},
	{path: 'crear-restaurantes', canActivate: [AuthguardGuard], component: RestaurantesAddComponent},
	{path: 'restaurantes/:id', component: RestaurantesDetailComponent},
	{path: 'editar-restaurantes/:id', canActivate: [AuthguardGuard], component: RestaurantesEditComponent},
	{path: 'importcsv-restaurantes', canActivate: [AuthguardGuard], component: RestaurantesImportCSVComponent},
	{path: 'importjson-restaurantes', canActivate: [AuthguardGuard], component: RestaurantesImportJSONComponent},
	{path: 'crear-usuarios', component: UsuariosAddComponent},
	{path: 'usuario', canActivate: [AuthguardGuard], component: UsuariosDetailComponent},
	{path: 'ver-perfil', canActivate: [AuthguardGuard], component: VerPerfilComponent},
	{path: 'editar-perfil', canActivate: [AuthguardGuard], component: UsuariosEditComponent},
	{path: 'tareas-pendientes', canActivate: [AuthguardGuard], component: TareasPendientesComponent},
	{path: '**', component: ErrorComponent}//siempre debe ser la última, para cuando la ruta no existe
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//recibe un array de rutas para estableces ese array de rutas con la configuración de angular
/* esto se carga en el app module */