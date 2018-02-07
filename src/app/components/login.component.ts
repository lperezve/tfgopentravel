import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';

@Component ({
	selector: 'login',
	templateUrl: '../views/login.html',
	providers: [AuthService]
})

export class LoginComponent {
	public usuario : Usuario;
	returnUrl : string;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _authService : AuthService
	){
		console.log('Se ha cargado el componente login.component.ts');
		this.usuario = new Usuario (0,'','','','','','',false);
	}

	/*ngOnInit(){
		this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
	}*/

	loginUsuario(event){
		var email = event.target.elements[0].value;
		var password = event.target.elements[1].value;
		console.log(email, password);
		this._authService.getUsuarioLogin(email,password).subscribe(
			response => {
				if (response.code == 200){
					this.usuario = response.data;
					this._authService.loginservice(this.usuario);
					alert("Se ha loggeado correctamente");
					/* para redirigir a la url previa del login */
					this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
					this._router.navigate([this.returnUrl]);
					location.reload();
				}
				else {
					this._router.navigate(['/home']);
					alert("Aún no tiene cuenta con nosotros. Regístrese en un momento!");
					console.log('El usuario no está registrado');
				}
			},
			error => {
				console.log(<any>error);
				console.log('cualquier error');
			}
		);
	}
}