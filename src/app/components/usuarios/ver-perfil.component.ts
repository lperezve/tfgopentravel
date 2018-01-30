import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

@Component ({
	selector: 'ver-perfil',
	templateUrl: '../../views/usuarios/ver-perfil.html',
	providers: [UsuarioService, AuthService]
})

export class VerPerfilComponent {
	public usuario : Usuario;
	public atributos;
	public usuarioArray;
	public confirmado;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private _authService : AuthService
	) {
		this.usuarioArray = [];
		this.confirmado = null;
	}

	ngOnInit(){
		console.log('Se ha cargado el componente usuarios-detail.component.ts');
		this.getAtributosUsuario();
		this.usuarioArray = [];
		this.showPerfil();
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
					//console.log(this.atributos);
				}
			}, 
			error => {
				console.log(<any>error);//para mostrar el error que nos devuelve
			}
		);
	}

	showPerfil(){
		this.getAtributosUsuario();
		this.getUsuario();
		for (var i in this.usuario) {
 			this.usuarioArray.push(this.usuario[i]);
		}
		console.log(this.usuarioArray);
	}

	borrarConfirm(id){
		this.confirmado = id;
		console.log(this.confirmado);
	}

	cancelarConfirm(id){
		this.confirmado = null;
	}

	onDeleteUsuario(id) {
		this._usuarioService.deleteUsuarios(id).subscribe(
			response => {
				if (response.code == 200) {
					this._authService.logoutService();
					this._router.navigate(['/home']);

				} else
					console.log(response);
			}, 
			error => {
				console.log(<any>error);
				}
		);
	}
}