import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';
import { Opinion } from '../../models/opinion'
import { AuthService } from '../../services/auth.service';
import 'rxjs/Rx';
import { saveAs as importedSaveAs} from "file-saver";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component ({
	selector: 'restaurantes-list',
	templateUrl: '../../views/restaurantes/restaurantes-list.html',
	providers: [RestauranteService, AuthService]
})

export class RestaurantesListComponent {
	public titulo : string;
	public restaurantes : Restaurante[]; //variable que se utiliza para el html luego
	public confirmado;
	public hayUsuario : boolean;
	public opinionesRecientes : Opinion[];

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _auth : AuthService
		) {
		this.titulo = 'Listado de Restaurantes';
		this.confirmado = null;

		if (_auth.authenticated()){
			this.hayUsuario = true;
		}
		else
			this.hayUsuario = false;
		//this.generateDownloadJson();
	}

	ngOnInit () {
		console.log('Se ha cargado el componente list-restaurantes.component.ts');
		this.getRestaurantes();
		this.getOpinionesRecientes();
	}

	getRestaurantes () {
		this._restauranteService.getRestaurantes().subscribe(
			result => {
				if (result.code != 200) { //cuando haya un error
					console.log(result);
				} else { //cuando todo va bien, se le asignan los datos
					this.restaurantes = result.data;
				}
			}, 
			error => {
				console.log(<any>error);//para mostrar el error que nos devuelve
			}
		);
	}

	borrarConfirm(id){
		this.confirmado = id;
	}

	cancelarConfirm(id){
		this.confirmado = null;
	}

	onDeleteRestaurante(id) {
		this._restauranteService.deleteRestaurantes(id).subscribe(
			response => {
				if (response.code == 200) {
					this.getRestaurantes();
				} else
					alert('Error al borrar producto');
			}, 
			error => {
				console.log(<any>error);
				}
			);
	}

	getOpinionesRecientes() {
		this._restauranteService.getOpinionesRecientes().subscribe(
			result => {
				if (result.code != 200){
					console.log(result);
				}
				else {
					this.opinionesRecientes = result.data;
				}
			}, error => {
				console.log(<any>error);
			}
		);
	}

	generateDownloadJson() {
		this._restauranteService.getRestaurantes().subscribe(
			result => {
				if (result.code != 200) { //cuando haya un error
					console.log(result);
				} else { //cuando todo va bien, se le asignan los datos
					let restaurantesDown : Restaurante = result.data;
					let theJSON = JSON.stringify(restaurantesDown);
    				var a = document.createElement("a");
				    a.setAttribute('style', 'display:none;');
				    document.body.appendChild(a);
				    var blob = new Blob([theJSON], { type: 'text/json' });
					var urlDownload = window.URL.createObjectURL(blob);
				    a.href = urlDownload;
				    a.download = 'Restaurantes.json';
				    a.click();
				}
			}, 
			error => {
				console.log(<any>error);//para mostrar el error que nos devuelve
			}
		);		
	}

	generateDownloadCSV () {
		this._restauranteService.getRestaurantes().subscribe(
			result => {
				if (result.code != 200) { //cuando haya un error
					console.log(result);
				} else { //cuando todo va bien, se le asignan los datos
					let restaurantesDowncsv : Restaurante = result.data;
					var csvData = this.ConvertToCSV(restaurantesDowncsv);
					var a = document.createElement("a");
				    a.setAttribute('style', 'display:none;');
				    document.body.appendChild(a);
				    var blob = new Blob([csvData], { type: 'text/csv' });
				    var url= window.URL.createObjectURL(blob);
				    a.href = url;
				    a.download = 'Restaurantes.csv';
				    a.click();
				}
			}, 
			error => {
				console.log(<any>error);//para mostrar el error que nos devuelve
			}
		);	
	}

	ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            var row = "";
 
            for (var index in objArray[0]) {
                //Now convert each value to string and comma-separated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            str += row + '\r\n';
 
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','
 
                    line += array[i][index];
                }
                str += line + '\r\n';
            }
            return str;
        }

}