import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { Propiedad } from '../../models/propiedad';
import { PropiedadService } from '../../services/propiedad.service';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component ({
	selector: 'tareas-pendientes',
	templateUrl: '../../views/usuarios/admin-tareas-pendientes.html',
	providers: [UsuarioService, AuthService, PropiedadService, RestauranteService]
})

export class TareasPendientesComponent {
	public usuario : Usuario;
	public admin : boolean = false;
	public peticiones = [];
	public restaurantes: Restaurante[];

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private _authService : AuthService,
		private _propiedadService : PropiedadService,
		private _restauranteService : RestauranteService,
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
		console.log('Se ha cargado el componente usuarios-detail.component.ts');
		this.getUsuario();
		this.getTareasPendientes();
		this.getRestaurantesNoValidados();
	}

	showSuccess() {
    	this.toastr.success('Se ha validado correctamente.', 'Success!');
  	}

  	showError() {
    	this.toastr.error('Error de validación.', 'Oops!');
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
					//console.log(response.data);
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
					this.toastr.success('Petición validada.', 'Success!');
					//console.log(response.message);
					window.location.reload();
				}
				else {
					this.toastr.error('Error de validación.', 'Oops!');
					//console.log(response);
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
					this.toastr.success('Petición denegada.', 'Success!');
					//console.log(response.message);
					window.location.reload();
				}
				else {
					this.toastr.error('Error de negación', 'Oops!');
					//console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getRestaurantesNoValidados(){
		this._restauranteService.getRestNoValidados().subscribe(
			response => {
				if (response.code == 200){
					//console.log(response.data);
					this.restaurantes = response.data;
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

	validarRest (id){
		this._restauranteService.validarRestaurante(id).subscribe(
			response => {
				if (response.code == 200){
					this.toastr.success('Restaurante validado.', 'Success!');
					//console.log(response.message);
					window.location.reload();
				}
				else {
					this.toastr.error('Error de validación.', 'Oops!');
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	denegarRest (id){
		this._restauranteService.denegarRestaurante(id).subscribe(
			response => {
				if (response.code == 200){
					this.toastr.success('Restaurante denegado.', 'Success!');
					//console.log(response.message);
					window.location.reload();
				}
				else {
					this.toastr.error('Error de negación', 'Oops!');
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}

