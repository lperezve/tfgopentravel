import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';
import { GLOBAL } from '../../services/global';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

@Component ({
	selector: 'restaurantes-add',
	templateUrl: '../../views/restaurantes/restaurantes-add.html',
	providers: [RestauranteService, UsuarioService, AuthService]
})

export class RestaurantesAddComponent {
	public titulo : string;
	public restaurante: Restaurante;
	public filesToUpload;
	public resultUpload;
	public usuario : Usuario;
	public admin : boolean = false;
	
	constructor (
		private _restauranteService : RestauranteService,
		private _route: ActivatedRoute,
		private _router: Router,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef,
		private _usuarioService: UsuarioService,
		private _authService : AuthService
		) {
		this.titulo = 'Crear un nuevo restaurante';
		this.restaurante = new Restaurante (0, '','','','','','');
		this.toastr.setRootViewContainerRef(vcr);
		if (_authService.authenticated()){
	      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
	      if (this.usuario.admin == true){
	         this.admin = true;
	      } else {
	      	this.admin = false;
	      }
	    }
	}

	ngOnInit () {
		console.log('Se ha cargado el componente add-restaurantes.component.ts');
		console.log(this.admin);
	}

	onSubmit() {
		console.log(this.restaurante);

		/*if (this.filesToUpload && this.filesToUpload.length >= 1) { //en el caso de que haya una imagen seleccionada
			this._restauranteService.makeFileRequest(GLOBAL.url+'upload-image', [], this.filesToUpload)
				.then((result) => {
					console.log(result);
					this.resultUpload = result;
					this.restaurante.imagen = this.resultUpload.filename;
					this.saveRestaurante();
				}, 
				(error) => {
					console.log(error);
				});
		}
		else {*/
			if (this.admin){
				//console.log("admin");
				this.saveRestaurante(); //se llama saveRestaurante sin tener que subir la imagen
			}
			else {
				//console.log("user");
				this.saveRestauranteUser();
			}
			
		//}
	}

	showSuccess() {
    	this.toastr.success('Restaurante insertado correctamente.', 'Success!');
  	}

  	showError() {
    	this.toastr.error('Error en la insercción del restaurante.', 'Oops!');
  	}

	saveRestaurante () {
		this._restauranteService.addRestaurantes(this.restaurante).subscribe(
			response => {
				if (response.code == 200) {
					this.showSuccess();
					this._router.navigate(['/restaurantes']);
				}
				else {
					this.showError();
					console.log(response);
				}
			}, 
			error => {
				console.log(<any>error);
			}
		);
	}

	saveRestauranteUser(){
		this._restauranteService.addRestauranteUser(this.restaurante).subscribe(
			response => {
				if (response.code == 200) {
					this.showSuccess();
					this._router.navigate(['/restaurantes']);
				}
				else {
					this.showError();
					console.log(response);
				}
			}, 
			error => {
				console.log(<any>error);
			}
		);
	}

	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		//console.log(this.filesToUpload);
	}
}