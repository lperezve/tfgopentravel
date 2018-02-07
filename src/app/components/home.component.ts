import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante';

@Component ({
	selector: 'home',
	templateUrl: '../views/home.html',
	styleUrls: ['../app.component.css'],
	providers: [RestauranteService]
})

export class HomeComponent {
	public titulo : string;
	public restaurantes : Restaurante[];
  	lat: number = 40.4893538;
  	lng: number = -3.6827461;
  	zoom : number = 5;

	constructor (private auth : AuthService,
				private _restauranteService : RestauranteService
				) {
		this.titulo = 'Página Principal';
		this.getRestaurantes();
	}

	ngOnInit () {
		console.log('Se ha cargado el componente home.component.ts');
	}

	getRestaurantes () {
		this._restauranteService.getRestaurantes().subscribe(
			result => {
				if (result.code != 200) {
					console.log(result);
				} else {
					this.restaurantes = result.data;
				}
			}, 
			error => {
				console.log(<any>error);
			}
		);
	}

	private convertStringToNumber(value: string): number {
    	return +value;
  	}
}