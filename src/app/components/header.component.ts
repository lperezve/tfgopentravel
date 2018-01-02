import { Component } from '@angular/core';
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
  public admin : boolean = false;

  constructor (private auth : AuthService){
    if (auth.authenticated()){
      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
      this.autenticado = auth.authenticated();
      if (this.usuario.admin == true){
         this.admin = true;
      } else {
      this.admin = false;
      }
    }
    //console.log(this.admin);
    //console.log(auth.authenticated());
  }
}