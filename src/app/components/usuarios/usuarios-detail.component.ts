import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { Opinion } from '../../models/opinion';


@Component ({
	selector: 'usarios-detail',
	templateUrl: '../../views/usuarios/usuarios-detail.html',
	providers: [UsuarioService, AuthService]
})

export class UsuariosDetailComponent {
	public usuario : Usuario;
	public opiniones;
	public hayOpiniones : boolean;
	public admin : boolean = false;
 
	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private auth : AuthService
	) {
		if (auth.authenticated()){
	      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
	      if (this.usuario.admin == true){
	         this.admin = true;
	      } else {
	      	this.admin = false;
	      }
	    }
		this.hayOpiniones = false;
	}

	ngOnInit(){
		console.log('Se ha cargado el componente usuarios-detail.component.ts');
		this.getUsuario();
		this.getOpinionesUsuario();
	}

	getUsuario(){
		this.usuario = JSON.parse(localStorage.getItem('currentUser'));
		this._usuarioService.getUsuario(this.usuario.id).subscribe(
			response => {
				if (response.code == 200)
					this.usuario = response.data;
				 else
					this._router.navigate(['/home']);
				},
			error => {
				console.log(<any>error);	
			}
		);
	}

	getOpinionesUsuario () {
		this._usuarioService.getOpinionesUser(this.usuario.id).subscribe(
			response => {
				if (response.code == 200){
					this.opiniones = response.data;
					this.hayOpiniones = true;
					console.log(this.opiniones);
				}
				else {
					this.hayOpiniones = false;
					console.log(response);
				}
				},
			error => {
				console.log(<any>error);
			}
		);
	}
}