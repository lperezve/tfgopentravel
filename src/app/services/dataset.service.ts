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
	getDatasetFields (filename, separacion) {
		return this._http.get(this.url+'csv-fields/'+filename+'/'+separacion).map(res => res.json());
	}

	/* SE PASA UN RESTAURANTE QUE TIENE LOS CAMPOS (FIELDS) NECESARIOS PARA LA INSERCCIÓN */
	addFields(filename, separacion, restaurante : Restaurante){
		let json = JSON.stringify(restaurante);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});
		return this._http.post(this.url+'up-csv/'+filename+'/'+separacion, params, {headers: headers})
				.map(res => res.json());
	}
}