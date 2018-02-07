import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component ({
	selector: 'usuarios-add',
	templateUrl: '../../views/usuarios/usuarios-add.html',
	providers: [UsuarioService]
})

export class UsuariosAddComponent {
	public titulo : string;
	public usuario: Usuario;

	constructor(
		private _usuarioService : UsuarioService,
		private _route: ActivatedRoute,
		private _router: Router
		) {
		this.titulo = 'Crear un nuevo usuario';
		this.usuario = new Usuario (0,'','','','','','',false);
	}
	ngOnInit() {
		console.log('Se ha cargado el componente usuarios-add.component.ts');
	}

	onSubmit (){
		console.log(this.usuario);
		this.saveUsuario();
	}

	saveUsuario() {
		this._usuarioService.addUsuarios(this.usuario).subscribe(
			response => {
				if (response.code == 200) {
					alert("Se ha registrado correctamente. Vaya al login para acceder a su cuenta");
					this._router.navigate(['/home']);
				}
				else {
					alert("No ha sido posible el registro. Inténtelo de nuevo.")
					console.log(response);
				}
			}, 
			error => {
				console.log(<any>error);
			}
		);
	}
}

