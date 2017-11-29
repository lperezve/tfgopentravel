import { Component } from '@angular/core';
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
	public resultDownload;

	constructor (
		private _restauranteService : RestauranteService,
		private _datasetService : DatasetService
		) {}

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
				this._datasetService.getDataset(this.resultUpload.filename).subscribe(
					result => {
						if (result.code != 200){
							console.log(result);
						} else {
							this.archivoObtenido = result;
							//this.resultDownload = JSON.stringify(this.archivoObtenido.data);
							this.resultDownload = this.archivoObtenido.data;
							console.log(this.resultDownload);
							if (this.isObject(this.resultDownload)){
								console.log("pepe");
							}
						}
					}
					);
				},
				(error) => {
					console.log(error);
				}
			);
	}

	isObject(obj : any):obj is Object {
		return obj != null && typeof obj ==='object';
	}

	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}
