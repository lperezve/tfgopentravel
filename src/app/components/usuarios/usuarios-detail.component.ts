import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';


@Component ({
	selector: 'usarios-detail',
	templateUrl: '../../views/usuarios/usarios-detail.html',
	providers: [UsuarioService, AuthService]
})

export class UsuariosDetailComponent {
	public usuario : Usuario;
 
	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private auth : AuthService
	) {}

	ngOnInit(){
		console.log('Se ha cargado el componente usuarios-detail.component.ts');
		this.getUsuario();
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
	

}