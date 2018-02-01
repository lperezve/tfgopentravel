import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';
import { Opinion } from '../../models/opinion'
import { AuthService } from '../../services/auth.service';
import 'rxjs/Rx';
import { saveAs as importedSaveAs} from "file-saver";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';


@Component ({
	selector: 'restaurantes-list',
	templateUrl: '../../views/restaurantes/restaurantes-list.html',
	providers: [RestauranteService, AuthService, UsuarioService]
})

export class RestaurantesListComponent {
	public titulo : string;
	public restaurantes : Restaurante[]; //variable que se utiliza para el html luego
	public confirmado;
	public esAdmin : boolean;
	public opinionesRecientes : Opinion[];
	public filtro;
	public selected;
	public propietario : boolean;
	public restProp = [];
	public usuario : Usuario;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _auth : AuthService,
		private _usuarioService : UsuarioService
		) {
		this.titulo = 'Listado de Restaurantes';
		this.confirmado = null;
		this.selected = 1;
		this.propietario = false;

		if (_auth.authenticatedAdmin()){
			this.esAdmin = true;
		}
		else
			this.esAdmin = false;
		//this.generateDownloadJson();
	}

	ngOnInit () {
		console.log('Se ha cargado el componente list-restaurantes.component.ts');
		if (this.filtro == null){
			//this.getRestaurantes();
			this.getRestaurantesPropietario();
		}
		this.getUsuario();
		this.getOpinionesRecientes();
		console.log(this.selected);
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

	getAll () {
		if(this.selected == 1){
			this.getRestaurantes();
			console.log("opcion1");
		}
		if (this.selected == 2){
			this.getRestaurantesValoracion();
			console.log("opcion2");
		}
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

	getRestaurantesValoracion () {
		this._restauranteService.getRestaurantesValorados().subscribe(
			result => {
				if (result.code == 200){
					this.restaurantes = result.data;
				}
				else {
					console.log(result);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getRestaurantesPropietario () {
		console.log("está entrando");
		this._restauranteService.getRestProp().subscribe(
			response => {
				if (response.code == 200){
					this.propietario = true;
					this.restProp = response.data;
					console.log(response.data);
				}
				else{
					console.log(response);
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