import { Component } from '@angular/core';
//import { Usuario } from './models/usuario';
//import { Router, ActivatedRoute, Params } from '@angular/router';
//import { UserLoginService } from './services/userlogin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor (
	){

    
  	console.log('app.component.ts cargado');
  }
}
