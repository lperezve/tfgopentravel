import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Restaurante } from '../models/restaurante';
import { GLOBAL } from './global';

@Injectable ()
export class RestauranteService {
	public url: string;

	constructor (
		public _http: Http
		) {
		this.url = GLOBAL.url;
	}

	getRestaurantes () {
		return this._http.get(this.url+'restaurantes').map(res => res.json());
	}

	//obtener el restaurante id
	getRestaurante (id) {
		return this._http.get(this.url+'restaurantes/'+id).map(res => res.json());
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