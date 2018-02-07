import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable ()
export class PropiedadService {
	public url: string;

	constructor (
		public _http: Http,
		) {
		this.url = GLOBAL.urlpropiedades;
	}

	//el usuario solicita ser el dueño de algún establecimiento, por tanto se manda una nueva solicitud
	nuevaSolicitud(id_usuario, id_restaurante){
		return this._http.get(this.url+'nueva-peticion/'+id_usuario+'/'+id_restaurante).map(res => res.json());
	}

	/* OBTENER LAS SOLICITUDES QUE AÚN NO HAN SIDO VALIDADAS */
	obtenerSolicitudesNoValidadas(){
		return this._http.get(this.url+'peticiones').map(res => res.json());
	}

	validarPeticion (id) {
		return this._http.get(this.url+'validar/'+id).map(res => res.json());
	}

	denegarPeticion (id) {
		return this._http.get(this.url+'denegar/'+id).map(res => res.json());
	}

	obtenerSiHayPeticion (id_usuario, id_restaurante) {
		return this._http.get(this.url+'hay-peticion/'+id_usuario+'/'+id_restaurante).map(res => res.json());
	}
}