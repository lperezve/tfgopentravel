import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

@Component ({
	selector: 'usarios-edit',
	templateUrl: '../../views/usuarios/usuarios-edit.html',
	providers: [UsuarioService, AuthService]
})

export class UsuariosEditComponent {
	public usuario : Usuario;
	public atributos;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private _authService : AuthService
	) {}

	ngOnInit(){
		console.log('Se ha cargado el componente usuarios-edit.component.ts');
		this.getUsuario();
		this.getAtributosUsuario();
	}

	getUsuario(){
		this.usuario = JSON.parse(localStorage.getItem('currentUser'));
		this._usuarioService.getUsuario(this.usuario.id).subscribe(
			response => {
				if (response.code == 200)
					this.usuario = response.data;
				 else
					this._router.navigate(['/home']);
				},
			error => {
				console.log(<any>error);	
			}
		);
	}

	getAtributosUsuario(){
		this._usuarioService.getAtributos().subscribe(
			result => {
				if (result.code != 200) { //cuando haya un error
					console.log(result);
				} else { //cuando todo va bien, se le asignan los datos
					this.atributos = result.data;
				}
			}, 
			error => {
				console.log(<any>error);//para mostrar el error que nos devuelve
			}
		);
	}
	
	updateUsuario() {
		console.log(this.usuario);
		this._usuarioService.editUsuarios(this.usuario.id, this.usuario).subscribe(
			response => {
				if (response.code == 200) {
					this._authService.loginservice(this.usuario);
					this._router.navigate(['/ver-perfil']);

				}
				else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}