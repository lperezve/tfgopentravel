import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component ({
	selector: 'usarios-edit',
	templateUrl: '../../views/usuarios/usuarios-edit.html',
	providers: [UsuarioService, AuthService]
})

export class UsuariosEditComponent {
	public usuario : Usuario;
	public atributos;
	public admin : boolean = false;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private _authService : AuthService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
	) {
		if (_authService.authenticated()){
	      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
	      if (this.usuario.admin == true){
	         this.admin = true;
	      } else {
	      	this.admin = false;
	      }
	    }
	    this.toastr.setRootViewContainerRef(vcr);
	}

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
					this.toastr.success('Usuario actualizado correctamente', 'Success!');
					this._authService.loginservice(this.usuario);
					this._router.navigate(['/ver-perfil']);
				}
				else {
					this.toastr.error('Problemas con la edición de usuario.', 'Oops!');
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}