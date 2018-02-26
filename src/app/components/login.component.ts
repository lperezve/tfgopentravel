import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
		private _authService : AuthService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
	){
		console.log('Se ha cargado el componente login.component.ts');
		this.usuario = new Usuario (0,'','','','','','',false);
		this.toastr.setRootViewContainerRef(vcr);
	}

	showSuccess() {
    	this.toastr.success('Inicio de sesión correcto', 'Success!');
  	}

  	showError() {
    	this.toastr.error('Aún no tiene cuenta con nosotros. Regístrese en un momento!', 'Oops!');
  	}


	loginUsuario(event){
		var email = event.target.elements[0].value;
		var password = event.target.elements[1].value;
		console.log(email, password);
		this._authService.getUsuarioLogin(email,password).subscribe(
			response => {
				if (response.code == 200){
					this.usuario = response.data;
					this._authService.loginservice(this.usuario);
					this.showSuccess();
					/* para redirigir a la url previa del login */
					this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
					this._router.navigate([this.returnUrl]);
					
					location.reload();
				}
				else {
					//this._router.navigate(['/home']);
					this.showError();
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