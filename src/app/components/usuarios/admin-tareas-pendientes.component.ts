import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { Propiedad } from '../../models/propiedad';
import { PropiedadService } from '../../services/propiedad.service';

@Component ({
	selector: 'tareas-pendientes',
	templateUrl: '../../views/usuarios/admin-tareas-pendientes.html',
	providers: [UsuarioService, AuthService, PropiedadService]
})

export class TareasPendientesComponent {
	public usuario : Usuario;
	public admin : boolean = false;
	public peticiones = [];

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private _authService : AuthService,
		private _propiedadService : PropiedadService
	) {
		if (_authService.authenticated()){
	      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
	      if (this.usuario.admin == true){
	         this.admin = true;
	      } else {
	      	this.admin = false;
	      }
	    }
	}

	ngOnInit(){
		console.log('Se ha cargado el componente usuarios-detail.component.ts');
		this.getUsuario();
		this.getTareasPendientes();
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

	getTareasPendientes (){
		this._propiedadService.obtenerSolicitudesNoValidadas().subscribe(
			response => {
				if (response.code == 200){
					console.log(response.data);
					this.peticiones = response.data;
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

	validar (id){
		this._propiedadService.validarPeticion(id).subscribe(
			response => {
				if (response.code == 200){
					console.log(response.message);
					window.location.reload();
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

	denegar (id) {
		this._propiedadService.denegarPeticion(id).subscribe(
			response => {
				if (response.code == 200){
					console.log(response.message);
					window.location.reload();
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

