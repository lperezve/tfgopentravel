import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable ()
export class UsuarioService {
	public url: string;

	constructor (
		public _http: Http,
		) {
		this.url = GLOBAL.urlusuarios;
	}

	getUsuario (id) {
		return this._http.get(this.url+'usuarios/'+id).map(res => res.json());
	}

	addUsuarios (usuario : Usuario) {
		let json = JSON.stringify(usuario);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});

		return this._http.post(this.url+'usuarios', params, {headers: headers})
				.map(res => res.json());
	}
}