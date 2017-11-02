import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante';

@Component ({
	selector: 'restaurantes-list',
	templateUrl: '../views/restaurantes-list.html',
	providers: [RestauranteService]
})

export class RestaurantesListComponent {
	public titulo : string;
	public restaurantes : Restaurante[]; //variable que se utiliza para el html luego
	public confirmado;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService
		) {
		this.titulo = 'Listado de Restaurantes';
		this.confirmado = null;
	}

	ngOnInit () {
		console.log('Se ha cargado el componente list-restaurantes.component.ts');
		this.getRestaurantes();
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
}