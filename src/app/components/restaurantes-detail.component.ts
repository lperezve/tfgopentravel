import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante';

@Component ({
	selector: 'restaurantes-detail',
	templateUrl: '../views/restaurantes-detail.html',
	providers: [RestauranteService]
})

export class RestaurantesDetailComponent {
	public restaurante : Restaurante;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService
	) {}

	ngOnInit() {
		console.log('Se ha cargado el componente restaurantes-detail.component.ts');

		this.getRestaurante();
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