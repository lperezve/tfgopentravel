import { Component } from '@angular/core';
//import { Usuario } from '../models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Component ({
	selector: 'navegacion',
	templateUrl: '../views/header.html',
	providers: [AuthService]
})

export class HeaderComponent {
  public usuario : Usuario;
  public autenticado : boolean;

  constructor (private auth : AuthService){
    this.usuario = JSON.parse(localStorage.getItem('currentuser'));
    this.autenticado = auth.authenticated();
    console.log(auth.authenticated());
  }
}