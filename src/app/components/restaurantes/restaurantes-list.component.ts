import { Component, ViewContainerRef } from '@angular/core';
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
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


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
	public hayUsuario : boolean;
	public ciudades = [];
	public selectedCity;
	lat: number = 40.4893538;
  	lng: number = -3.6827461;
  	zoom : number = 4;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _auth : AuthService,
		private _usuarioService : UsuarioService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		) {
		this.titulo = 'Listado de Restaurantes';
		this.confirmado = null;
		this.selected = 1;
		this.propietario = false;
		this.hayUsuario = false;
		this.selectedCity = '';

		if (_auth.authenticatedAdmin()){
			this.esAdmin = true;
			this.hayUsuario = true;
		}
		else
			this.esAdmin = false;
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit () {
		console.log('Se ha cargado el componente list-restaurantes.component.ts');
		if (this.filtro == null){
			this.getRestaurantesPropietario();
		}
		if (JSON.parse(localStorage.getItem('currentUser'))){
			this.hayUsuario = true;
			this.getUsuario();
		}
		else {
			this.hayUsuario = false;
		}	
		this.getOpinionesRecientes();
		this.getRestaurantes();
	}

	getUsuario(){
		this.usuario = JSON.parse(localStorage.getItem('currentUser'));
		console.log(this.usuario);
		this._usuarioService.getUsuario(this.usuario.id).subscribe(
			response => {
				if (response.code == 200)
					this.usuario = response.data;
				},
			error => {
				console.log(<any>error);	
			}
		);
	}

	getAll () {
		if(this.selected == 1){
			this.getRestaurantesPropietario();
		}
		if (this.selected == 2){
			this.getRestaurantesValoracion();
		}

		if (this.selected == 3){
			this.getRestaurantesMenorValoracion();
		}
		if (this.selected == 4){
			this.getRestaurantesMasComment();
		}
		if (this.selected == 5){
			this.getRestaurantesMenosComment();
		}

		if (this.selected == 7){
			this._restauranteService.getCiudadesRestaurantes().subscribe(
				result => {
					if (result.code == 200){
						this.ciudades = result.data;
						console.log(this.ciudades);
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

		//MAPA DE RESTAURANTES
		if (this.selected == 6){
			this.getRestaurantes();
		}
	}

	getCity (){
		console.log(this.selectedCity);
		this._restauranteService.getRestaurantesCiudad(this.selectedCity).subscribe(
			result => {
				if (result.code == 200) {
					this.restProp = result.data;
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

	private convertStringToNumber(value: string): number {
    	return +value;
  	}

	getRestaurantesValoracion () {
		this._restauranteService.getRestaurantesValorados().subscribe(
			result => {
				if (result.code == 200){
					this.restProp = result.data;
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

	getRestaurantesMenorValoracion () {
		this._restauranteService.getRestaurantesMenosValorados().subscribe(
			result => {
				if (result.code == 200){
					this.restProp = result.data;
					console.log(this.restProp);
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

	getRestaurantesMasComment () {
		this._restauranteService.getRestaurantesMasComentarios().subscribe(
			result => {
				if (result.code == 200){
					this.restProp = result.data;
					console.log(this.restProp);
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

	getRestaurantesMenosComment () {
		this._restauranteService.getRestaurantesMenosComentarios().subscribe(
			result => {
				if (result.code == 200){
					this.restProp = result.data;
					console.log(this.restProp);
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
		//console.log("está entrando");
		this._restauranteService.getRestPropAvg().subscribe(
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
					this.toastr.success('El restaurante: '+ id + ' - ' + nombre +', se ha borrado correctamente', 'Success!');
					this.getRestaurantesPropietario();
				} else
					this.toastr.error('Error al borrar el restaurante', 'Oops!');
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
}