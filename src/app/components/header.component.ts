import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante';
import { DropdownModule } from "ngx-dropdown";

@Component ({
	selector: 'navegacion',
	templateUrl: '../views/header.html',
	providers: [AuthService, RestauranteService]
})

export class HeaderComponent {
  public usuario : Usuario;
  public autenticado : boolean;
  public admin : boolean = false;

  constructor (private auth : AuthService, private _restauranteService: RestauranteService){
    if (auth.authenticated()){
      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
      this.autenticado = auth.authenticated();
      if (this.usuario.admin == true){
         this.admin = true;
      } else {
      this.admin = false;
      }
    }
  }

  generateDownloadJson() {
    this._restauranteService.getRestaurantes().subscribe(
      result => {
        if (result.code != 200) { //cuando haya un error
          console.log(result);
        } else { //cuando todo va bien, se le asignan los datos
          let restaurantesDown : Restaurante = result.data;
          let theJSON = JSON.stringify(restaurantesDown);
            var a = document.createElement("a");
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            var blob = new Blob([theJSON], { type: 'text/json' });
          var urlDownload = window.URL.createObjectURL(blob);
            a.href = urlDownload;
            a.download = 'Restaurantes.json';
            a.click();
        }
      }, 
      error => {
        console.log(<any>error);//para mostrar el error que nos devuelve
      }
    );    
  }

  generateDownloadCSV () {
    this._restauranteService.getRestaurantes().subscribe(
      result => {
        if (result.code != 200) { //cuando haya un error
          console.log(result);
        } else { //cuando todo va bien, se le asignan los datos
          let restaurantesDowncsv : Restaurante = result.data;
          var csvData = this.ConvertToCSV(restaurantesDowncsv);
          var a = document.createElement("a");
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            var blob = new Blob([csvData], { type: 'text/csv' });
            var url= window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'Restaurantes.csv';
            a.click();
        }
      }, 
      error => {
        console.log(<any>error);//para mostrar el error que nos devuelve
      }
    );  
  }

  ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            var row = "";
 
            for (var index in objArray[0]) {
                //Now convert each value to string and comma-separated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            str += row + '\r\n';
            
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                  var sin_salto = array[i][index].split("\n").join(" ");
                    if (line != '') line += ',';


                    line += sin_salto;
                }
                str += line + '\r\n';
            }
            return str;
        }
}