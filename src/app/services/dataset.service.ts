import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Restaurante } from '../models/restaurante';

@Injectable ()
export class DatasetService {
	public url: string;

	constructor (
		public _http: Http
		) {
		this.url = GLOBAL.url;
	}

	/* busca el dataset según su nombre */
	getDatasetFields (filename) {
		return this._http.get(this.url+'dataset-fields/'+filename).map(res => res.json());
	}

	/* pasar los campos correctos del dataset para su insercción */
	addFields(filename, restaurante : Restaurante){
		let json = JSON.stringify(restaurante);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});
		return this._http.post(this.url+'up-dataset/'+filename, params, {headers: headers})
				.map(res => res.json());
	}
}