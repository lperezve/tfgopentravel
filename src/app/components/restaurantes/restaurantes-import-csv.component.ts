import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { DatasetService } from '../../services/dataset.service';
import { Restaurante } from '../../models/restaurante';
import { GLOBAL } from '../../services/global';

@Component ({
	selector: 'restaurantes-import-csv',
	templateUrl: '../../views/restaurantes/restaurantes-import-dataset.html',
	providers: [RestauranteService, DatasetService]
})

export class RestaurantesImportCSVComponent {
	public soyCsv : boolean;
	public soyJson : boolean;
	public separacion : string;
	//-------
	public filesToUpload;
	public resultUpload;
	public archivoObtenido;
	public atributos;
	public fields;
	public restaurante : Restaurante;
	public importado : boolean;
	public mensajeError;
	public errorImportacion : boolean;
	public inputButton : boolean;

	constructor (private _restauranteService : RestauranteService,
		private _datasetService : DatasetService,
		private _route: ActivatedRoute,
		private _router: Router) {
		this.soyCsv = true;
		this.soyJson = false;
		//----
		this.restaurante = new Restaurante (0, '','','','','','');
		this.importado = false;
		this.errorImportacion = false;
		this.inputButton = false;
		this.separacion = null;
	}

	ngOnInit () {
		console.log('Se ha cargado el componente restaurantes-import-csv.component.ts');
	}

	onSubmit(){//PRIMERO SE SUBE EL DATASET AL SERVIDOR PARA PODER TRABAJAR CON EL 
			this._restauranteService.makeFileRequest(GLOBAL.url+'upload-dataset', [], this.filesToUpload).then((result) => {
				console.log(result);
				this.resultUpload = result;
				//OBTENEMOS LOS FIELDS DEL DATASET QUE ACABAMOS DE SUBIR, 
				this._datasetService.getDatasetFields(this.resultUpload.filename, this.separacion).subscribe(
					result => {
						if (result.code != 200){
							console.log(result);
							this.errorImportacion = true;
							this.mensajeError = result.message;
						} else {
							//OBTENEMOS LOS ATRIBUTOS DE LA TABLA RESTAURANTES PARA SU EMPAREJAMIENTO
							this._restauranteService.getAtributosTabla().subscribe(
								result => {
									if (result.code != 200){
										console.log(result);
									} else {
										this.atributos = result.data;
										this.importado = true;
									}
									this.errorImportacion = false;
								}
							);					
							console.log("va bien");
							this.archivoObtenido = result;
							this.fields = this.archivoObtenido.data;
							console.log(this.fields);
						}
					}
					);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	passingFields(){
		this._route.params.forEach((params: Params) => {
			let filename = this.resultUpload.filename;
			console.log("HASTA AQUÍ");
			//PASAMOS LOS FIELDS EMPAREJADOS CON LOS ATRIBUTOS DE LA BASE DE DATOS PARA PODER INSERTARLOS A TRAVES DE LA API
			this._datasetService.addFields(filename, this.separacion, this.restaurante).subscribe(
			response => {
				console.log(response);
				if (response.code == 200){
					console.log(response);
					this._router.navigate(['/restaurantes']);
				}
				else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			});
		console.log("Aquí tambien");
		});
	}

	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		this.inputButton = true;
		console.log(this.filesToUpload);
	}
}