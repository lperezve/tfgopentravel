import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { DatasetService } from '../../services/dataset.service';
import { Restaurante } from '../../models/restaurante';
import { GLOBAL } from '../../services/global';

@Component ({
	selector: 'restaurantes-import-dataset',
	templateUrl: '../../views/restaurantes/restaurantes-import-dataset.html',
	providers: [RestauranteService, DatasetService]
})

export class RestaurantesImportDatasetComponent {
	public filesToUpload;
	public resultUpload;
	public archivoObtenido;
	public atributos;
	public fields;
	//public correctFields : Array<any>
	//public correctData : Array<any>;
	public restaurante : Restaurante;
	public importado : boolean;

	constructor (
		private _restauranteService : RestauranteService,
		private _datasetService : DatasetService,
		private _route: ActivatedRoute,
		private _router: Router
		) {
		//this.correctData=[{}];
		//this.correctFields=[{}];
		this.restaurante = new Restaurante (0, '','','','','','');
		this.importado = false;
		}

	ngOnInit () {
		console.log('Se ha cargado el componente restaurantes-import-dataset.component.ts');
	}

	onSubmit(){
			this._restauranteService.makeFileRequest(GLOBAL.url+'upload-dataset', [], this.filesToUpload).then((result) => {
				console.log(result);
				this.resultUpload = result;
				//UNA VEZ OBTENIDO EL RESULT, TENGO EL FILENAME PARA EXTRAER EL DATASET Y MOSTRARLO.
				/*LO QUE DEBERÍA HACER ES UN MÉTODO EN EL SERVICE QUE ME DEVUELVA EL DATASET DESEADO 
				Y MOSTRARLO
				-->SIGUIENTE PASO: PARSEAR EL JSON, ALGÚN MÉTODO QUE EXTRAIGA TODOS LOS 
				ATRIBUTOS NECESARIOS PARA EMPAREJARLOS CON LA BD
				*/
				this._datasetService.getDatasetFields(this.resultUpload.filename).subscribe(
					result => {
						if (result.code != 200){
							console.log(result);
						} else {

							this._restauranteService.getAtributosTabla().subscribe(
								result => {
									if (result.code != 200){
										console.log(result);
									} else {
										this.atributos = result.data;
										this.importado = true;
									}
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
			this._datasetService.addFields(filename, this.restaurante).subscribe(
			response => {
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
				}
			);
		});
	}

	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}
