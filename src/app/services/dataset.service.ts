import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable ()
export class DatasetService {
	public url: string;

	constructor (
		public _http: Http
		) {
		this.url = GLOBAL.url;
	}

	getDataset (filename) {
		return this._http.get(this.url+'dataset/'+filename).map(res => res.json());
	}
}