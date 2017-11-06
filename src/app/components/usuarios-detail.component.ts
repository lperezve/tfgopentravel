import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component ({
	selector: 'usarios-detail',
	templateUrl: '../views/usarios-detail.html',
	providers: [UsuarioService]
})

export class UsuariosDetailComponent {
	public usuario : Usuario;

	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService
	) {}

	ngOnInit(){
		console.log('Se ha cargado el componente usuarios-detail.component.ts');
		this.getUsuario();
	}

	getUsuario(){
		this._route.params.forEach((params : Params) => {
			let id = params['id'];
			this._usuarioService.getUsuario(id).subscribe(
				response => {
					if (response.code == 200){
						this.usuario = response.data;
					} else
						this._router.navigate(['/home']);
					},
					error => {
						console.log(<any>error);	
					}
			);
		});
	}

}