import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';
import { GLOBAL } from '../../services/global';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { PropiedadService } from '../../services/propiedad.service';


@Component ({
	selector: 'restaurantes-edit',
	templateUrl: '../../views/restaurantes/restaurantes-add.html',
	providers: [RestauranteService, UsuarioService, AuthService, PropiedadService]
})

export class RestaurantesEditComponent {
	public titulo: string;
	public restaurante: Restaurante;
	public is_edit;
	public usuario : Usuario;
	public admin : boolean = false;
	public noPropietario : boolean;

	constructor (
		private _restauranteService : RestauranteService,
		private _route: ActivatedRoute,
		private _router: Router,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef,
		private _propiedadService : PropiedadService,
		private _usuarioService : UsuarioService,
		private auth : AuthService
	) {
		this.titulo = 'Editar Restaurante';
		this.restaurante = new Restaurante (0, '','','','','','','');
		this.is_edit = true;
		this.noPropietario = false;
		this.toastr.setRootViewContainerRef(vcr);
		if (auth.authenticated()){
	      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
	      if (this.usuario.admin == true){
	         this.admin = true;
	      } else {
	      	this.admin = false;
	      }
	    }
	}

	ngOnInit () {
		console.log('Se ha cargado el componente edit-restaurantes.component.ts');
		if (this.admin){
			this.getRestauranteAdmin();
		}
		else {
			this.getRestaurante();
		}
		
	}

	onSubmit() {
		console.log(this.restaurante);
		this.updateRestaurante(); 
	}

	updateRestaurante () {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];//recogemos el parametro llamado id de la url
			this._restauranteService.editRestaurantes(id, this.restaurante).subscribe(
				response => {
					if (response.code == 200) {
						this.toastr.success('Restaurante editado correctamente.', 'Success!');
						this._router.navigate(['/restaurantes', id]);
					}
					else {
						this.toastr.error('Ha habido un problema con la edición del restaurante.', 'Oops!');
						console.log(response);
					}
				}, 
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	getRestaurante(){
		/* recoger el parámetro de la url para sacar el id */
		this._route.params.forEach((params: Params) => {
			let id = params['id'];//recogemos el parametro llamado id de la url
			this._propiedadService.comprobarPropiedad(id, this.usuario.id).subscribe(
				response => {
					if (response.code == 200){
						if(response.bandera == true){
							this.noPropietario = false;
							this._restauranteService.getRestaurante(id).subscribe(
								response => {
										if (response.code == 200){
											this.restaurante = response.data;
										} else
											this._router.navigate(['/restaurantes']);//redireccion a restaurantes si falla
									},
								error => {
									console.log(<any>error);
								}
							);
						}
						else {
							this.noPropietario = true;
						}
					}
					else
						this._router.navigate(['/restaurantes']);
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	getRestauranteAdmin(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._restauranteService.getRestaurante(id).subscribe(
				response => {
						if (response.code == 200){
							this.restaurante = response.data;
						} else
							this._router.navigate(['/restaurantes']);//redireccion a restaurantes si falla
					},
				error => {
					console.log(<any>error);
				}
			);
		});
	}
}