import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante';
import { GLOBAL } from '../services/global';

@Component ({
	selector: 'restaurantes-edit',
	templateUrl: '../views/restaurantes-add.html',
	providers: [RestauranteService]
})

export class RestaurantesEditComponent {
	public titulo: string;
	public restaurante: Restaurante;
	public filesToUpload;
	public resultUpload;
	public is_edit;

	constructor (
		private _restauranteService : RestauranteService,
		private _route: ActivatedRoute,
		private _router: Router
		) {
		this.titulo = 'Editar restaurante';
		this.restaurante = new Restaurante (0, '','','','','','');
		this.is_edit = true;
	}

	ngOnInit () {
		console.log('Se ha cargado el componente edit-restaurantes.component.ts');
		this.getRestaurante();
	}

	onSubmit() {
		console.log(this.restaurante);

		if (this.filesToUpload && this.filesToUpload.length >= 1) { //en el caso de que haya una imagen seleccionada
			this._restauranteService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload)
				.then((result) => {
					console.log(result);
					this.resultUpload = result;
					this.restaurante.imagen = this.resultUpload.filename;
					this.updateRestaurante();
				}, 
				(error) => {
					console.log(error);
				});
		}
		else {
			this.updateRestaurante(); //se llama saveRestaurante sin tener que subir la imagen
		}
	}

	updateRestaurante () {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];//recogemos el parametro llamado id de la url
			this._restauranteService.editRestaurantes(id, this.restaurante).subscribe(
				response => {
					if (response.code == 200) {
						this._router.navigate(['/restaurantes', id]);
					}
					else {
						console.log(response);
					}
				}, 
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

	getRestaurante(){
		/* recoger el parámetro de la url para sacar el id */
		this._route.params.forEach((params: Params) => {
			let id = params['id'];//recogemos el parametro llamado id de la url
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