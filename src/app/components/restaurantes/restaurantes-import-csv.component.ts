import { Component, Input, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { DatasetService } from '../../services/dataset.service';
import { Restaurante } from '../../models/restaurante';
import { GLOBAL } from '../../services/global';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
	public errorInsercion : boolean;
	public ciudad;

	constructor (private _restauranteService : RestauranteService,
		private _datasetService : DatasetService,
		private _route: ActivatedRoute,
		private _router: Router,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
	) {
		this.soyCsv = true;
		this.soyJson = false;
		//----
		this.restaurante = new Restaurante (0, '','','','','','');
		this.importado = false;
		this.errorImportacion = false;
		this.inputButton = false;
		this.separacion = null;
		this.errorInsercion = false;
		this.toastr.setRootViewContainerRef(vcr);
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
							this.toastr.error('La extensión no es correcta', 'Oops!');
						} else {
							this.toastr.info('Dataset importado. Continue con el emparejamiento.');
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
			//console.log("HASTA AQUÍ");
			//PASAMOS LOS FIELDS EMPAREJADOS CON LOS ATRIBUTOS DE LA BASE DE DATOS PARA PODER INSERTARLOS A TRAVES DE LA API
			this._datasetService.addFields(filename, this.separacion, this.restaurante, this.ciudad).subscribe(
			response => {
				console.log(response);
				if (response.code == 200){
					this.toastr.success('Los datos se han subido correctamente.', 'Success!');
					this.toastr.info('Se han añadido ' + response.numRegistros + ' restaurantes.');
					console.log(response);
					this._router.navigate(['/restaurantes']);
				}
				else {
					this.toastr.error('Error en la subida de datos.', 'Oops!');
					this.errorInsercion = true;
					this.mensajeError = response.message;
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			});
		//console.log("Aquí tambien");
		});
	}

	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		this.inputButton = true;
		console.log(this.filesToUpload);
	}
}