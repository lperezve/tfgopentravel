import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { Opinion } from '../../models/opinion';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';


@Component ({
	selector: 'usarios-detail',
	templateUrl: '../../views/usuarios/usuarios-detail.html',
	providers: [UsuarioService, AuthService, RestauranteService]
})

export class UsuariosDetailComponent {
	public usuario : Usuario;
	public opiniones;
	public hayOpiniones : boolean;
	public admin : boolean = false;
	public restaurantes : Restaurante[];
	public hayRestaurantes : boolean;
	public confirmado;

 
	constructor (
		private _route : ActivatedRoute,
		private _router : Router,
		private _usuarioService : UsuarioService,
		private _restauranteService : RestauranteService,
		private auth : AuthService
	) {
		if (auth.authenticated()){
	      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
	      if (this.usuario.admin == true){
	         this.admin = true;
	      } else {
	      	this.admin = false;
	      }
	    }
		this.hayOpiniones = false;
		this.hayRestaurantes = false;
		this.confirmado = null;
	}

	ngOnInit(){
		console.log('Se ha cargado el componente usuarios-detail.component.ts');
		this.getUsuario();
		this.getRestaurantesUsuario();
		this.getOpinionesUsuario();
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

	getRestaurantesUsuario(){
		this._restauranteService.getRestaurantesUsuario(this.usuario.id).subscribe(
			response => {
				if (response.code == 200){
					this.restaurantes = response.data;
					this.hayRestaurantes = true;
				}
				else {
					console.log(response);
					this.hayRestaurantes = false;
				}
			}, 
			error => {
				console.log(<any>error);
			}
		);
	}

	borrarConfirm(id){
		this.confirmado = id;
	}

	cancelarConfirm(id){
		this.confirmado = null;
	}

	onDeleteRestaurante(id, nombre) {
		this._restauranteService.deleteRestaurantes(id).subscribe(
			response => {
				if (response.code == 200) {
					alert('El restaurante: '+ id + ' - ' + nombre +', se ha borrado correctamente');
					window.location.reload();
				} else
					alert('Error al borrar el restaurante');
			}, 
			error => {
				console.log(<any>error);
			}
		);
	}

	getOpinionesUsuario () {
		this._usuarioService.getOpinionesUser(this.usuario.id).subscribe(
			response => {
				if (response.code == 200){
					this.opiniones = response.data;
					this.hayOpiniones = true;
					console.log(this.opiniones);
				}
				else {
					this.hayOpiniones = false;
					console.log(response);
				}
				},
			error => {
				console.log(<any>error);
			}
		);
	}
}