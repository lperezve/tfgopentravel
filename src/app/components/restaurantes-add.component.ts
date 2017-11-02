import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante';
import { GLOBAL } from '../services/global';

@Component ({
	selector: 'restaurantes-add',
	templateUrl: '../views/restaurantes-add.html',
	providers: [RestauranteService]
})

export class RestaurantesAddComponent {
	public titulo : string;
	public restaurante: Restaurante;
	public filesToUpload;
	public resultUpload;
	
	constructor (
		private _restauranteService : RestauranteService,
		private _route: ActivatedRoute,
		private _router: Router
		) {
		this.titulo = 'Crear un nuevo restaurante';
		this.restaurante = new Restaurante (0, '','','','','','');
	}

	ngOnInit () {
		console.log('Se ha cargado el componente add-restaurantes.component.ts');
	}

	onSubmit() {
		console.log(this.restaurante);

		if (this.filesToUpload && this.filesToUpload.length >= 1) { //en el caso de que haya una imagen seleccionada
			this._restauranteService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload)
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
		else {
			this.saveRestaurante(); //se llama saveRestaurante sin tener que subir la imagen
		}
	}

	saveRestaurante () {
		this._restauranteService.addRestaurantes(this.restaurante).subscribe(
			response => {
				if (response.code == 200) {
					this._router.navigate(['/restaurantes']);
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

	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}