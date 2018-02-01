import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Restaurante } from '../models/restaurante';
import { GLOBAL } from './global';
import { Opinion } from '../models/opinion';


@Injectable ()
export class RestauranteService {
	public url: string;
	public urlOpiniones: string;

	constructor (
		public _http: Http
		) {
		this.url = GLOBAL.urlrestaurantes;
		this.urlOpiniones = GLOBAL.urlopinionesRestaurantes;

	}

	getRestaurantes () {
		return this._http.get(this.url+'restaurantes').map(res => res.json());
	}

	getRestaurantesValorados() {
		return this._http.get(this.url+'valorados').map(res => res.json());
	}

	//OBTENER TODOS LOS RESTAURANTES Y LOS PROPIETARIOS DE AQUELLOS QUE TENGAN
	getRestProp(){
		return this._http.get(this.url+'restaurantes-propietario').map(res => res.json());
	}

	//comprobar si el restaurante tiene propietario, y en ese caso, devolver al propietario
	getPropietarioRestaurante (id) {
		return this._http.get(this.url+'tiene-propietario/'+id).map(res => res.json());
	}

	//obtener el restaurante id
	getRestaurante (id) {
		return this._http.get(this.url+'restaurantes/'+id).map(res => res.json());
	}

	//obtener los restauranes del usuario pasado por parámetro
	getRestaurantesUsuario (id) {
		return this._http.get(this.url+'restaurantes-usuario/'+id).map(res => res.json());
	}

	addRestaurantes (restaurante : Restaurante) {
		let json = JSON.stringify(restaurante);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});

		return this._http.post(this.url+'restaurantes', params, {headers: headers})
				.map(res => res.json());
	}

	editRestaurantes (id, restaurante : Restaurante) {
		let json = JSON.stringify(restaurante);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});

		return this._http.post(this.url+'update-restaurantes/'+id, params, {headers: headers})
				.map(res => res.json());
	}

	deleteRestaurantes (id) {
		return this._http.get(this.url+'delete-restaurantes/'+id).map(res => res.json());
	}

	/* obtener las opiniones de un restaurante pasado por parámetro. 
	También se obtienen el nombre de los que han dejado la opinión*/
	getOpinionesRestaurante(id){
		return this._http.get(this.url+'opiniones/'+id).map(res => res.json());
	}

	addOpinion(opinion : Opinion){
		let json = JSON.stringify(opinion);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});
		/* falta hacer el metodo en la api*/
		return this._http.post(this.urlOpiniones+'opinion', params, {headers: headers})
				.map(res => res.json());
	}

	getAvgOpinionesRestaurante(id){
		return this._http.get(this.urlOpiniones+'avg-opiniones/'+id).map(res => res.json());
	}

	//obtener la opinion que se le pasa por el id
	getOpinion(id){
		return this._http.get(this.urlOpiniones+'opinion/'+id).map(res => res.json());
	}

	/* OBTENER TODAS LAS OPINIONES DE MAS NUEVAS A MÁS ANTIGUAS */
	getOpinionesRecientes (){
		return this._http.get(this.urlOpiniones+'opiniones-recientes').map(res => res.json());
	}

	/* obtener los atributos de la tabla restaurantes */
	getAtributosTabla(){
		return this._http.get(this.url+'atributos').map(res => res.json());
	}

	/* subir ficheros */
	makeFileRequest (url:string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject) => {
			var formData: any = new FormData(); 
			var xhr = new XMLHttpRequest();

			for(var i=0; i<files.length; i++){
				formData.append('uploads[]', files[i], files[i].name);
			}
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4){
					if (xhr.status == 200){
							resolve(JSON.parse(xhr.response));
						} else {
							reject(xhr.response);
						}
				}
			};
			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}
}