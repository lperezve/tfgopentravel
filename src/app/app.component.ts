import { Component } from '@angular/core';
//import { Usuario } from './models/usuario';
//import { Router, ActivatedRoute, Params } from '@angular/router';
//import { UserLoginService } from './services/userlogin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
 /* usuario : Usuario;
  hayUsuario : boolean;*/

  constructor (
 /* private _route: ActivatedRoute,
	private _router: Router,
	private _userloginservice: UserLoginService*/
	){
  	/*this.usuario = new Usuario (0,'','','','','','',false);
  	this.hayUsuario = this._userloginservice.getUserLoggedIn();
  	console.log(this.hayUsuario);
  	sessionStorage.clear();
  	this.usuarioSesion();*/
    
  	console.log('app.component.ts cargado');
  }

  /*usuarioSesion(){
  	console.log(sessionStorage.getItem('currentuser'));
  	if (sessionStorage.getItem('currentuser')){
  		this.usuario = JSON.parse(sessionStorage.getItem('currentuser'));
  		this.hayUsuario = true;
  		//console.log("id usuario sesion " + this.usuario.id);
  	}
  }

  logout(event){
  	this._userloginservice.userLoggedOut();
  	localStorage.removeItem('currentuser');
  	sessionStorage.removeItem('currentuser');
  }*/
}
