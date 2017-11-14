import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable ()
export class AuthService {
	public url: string;

	constructor (
		public _http: Http,
		) {
		this.url = GLOBAL.urlusuarios;
	}

	getUsuarioLogin(email, password){
		return this._http.get(this.url+'existeusuario/'+email+'/'+password).map(res => res.json());
	}

	loginservice (_usuario : Usuario) {
		localStorage.setItem('currentUser', JSON.stringify(_usuario));
	}

	logoutService () {
		localStorage.removeItem('currentUser');
	}

	public authenticated (){
		if (localStorage.getItem('currentUser')){
			return true;
		}
		else
			return false;
	}
}