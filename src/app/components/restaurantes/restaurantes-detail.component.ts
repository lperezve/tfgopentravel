import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';
import { Opinion } from '../../models/opinion';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { PropiedadService } from '../../services/propiedad.service';
//import { AgmCoreModule } from '@agm/core';

@Component ({
	selector: 'restaurantes-detail',
	templateUrl: '../../views/restaurantes/restaurantes-detail.html',
	providers: [RestauranteService, UsuarioService, AuthService, PropiedadService]
})

export class RestaurantesDetailComponent {
	public restaurante : Restaurante;
	public opiniones: Opinion[];
	public opinion : Opinion;
	public usuario : Usuario;
	public hayUsuario : boolean;
	public avg;
	public usuariosOpinion;
	public opinionSingle : Opinion;
	public propietario : boolean;
	public userPropi : Usuario;
	public solicitado : boolean;


	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _usuarioService: UsuarioService,
		private _auth : AuthService,
		private _propiedadService : PropiedadService
	) {
		this.opinion = new Opinion(0,0,0,0,'','');
		this.opinionSingle = new Opinion(0,0,0,0,'','');
		this.propietario = false;
		this.solicitado = false;
		if (_auth.authenticated()){
			this.hayUsuario = true;
		}
		else
			this.hayUsuario = false;

	}

	ngOnInit() {
		console.log('Se ha cargado el componente restaurantes-detail.component.ts');
		this.getRestaurante();
		this.getOpiniones();
		this.obtenerPropietario();
		this.getUsuario();
	}

	getRestaurante(){
		/* recoger el parámetro de la url para sacar el id */
		this._route.params.forEach((params: Params) => {
			let id = params['id'];//recogemos el parametro llamado id de la url
			this._restauranteService.getRestaurante(id).subscribe(
				response => {
						if (response.code == 200){
							this.restaurante = response.data;
							this.obtenerMediaOpiniones();
						} else
							this._router.navigate(['/restaurantes']);//redireccion a restaurantes si falla
					},
					error => {
						console.log(<any>error);
					}
			);
		});
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

	/*obtener las opiniones de un restaurante */
	getOpiniones(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._restauranteService.getOpinionesRestaurante(id).subscribe(
				response => {
					if (response.code == 200)
						this.opiniones = response.data;
						console.log(this.opiniones);
				},
				error => {
					console.log(<any>error);
			});
		});
	}

	obtenerMediaOpiniones(){
		this._restauranteService.getAvgOpinionesRestaurante(this.restaurante.id).subscribe(
			response => {
				if (response.code == 200){
					this.avg = response.data;
				}
				else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	obtenerUsuariosOpinion(){
	}

	obtenerPropietario () {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._restauranteService.getPropietarioRestaurante(id).subscribe(
				response => {
					if (response.code == 200 && response.bandera == true){
						this.propietario = true;
						this.userPropi = response.data;
						console.log(response.data);
					}
					else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	esSolicitado(){
		this.solicitado = true;
	}

	cancelarSolicitud(){
		this.solicitado = false;
	}

	solicitarPropiedad(id){
		console.log(this.usuario.id);
		console.log(id);
		this._propiedadService.nuevaSolicitud(this.usuario.id, id).subscribe(
			response => {
				if (response.code == 200){
					console.log(response.message);
					this.solicitado = false;
				}
				else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
	// ---------------- cuando el usuario está logeado ----------------------- //

	onSubmitOpinion(){
		//obtener el usuario de la sesión
		this.usuario = JSON.parse(localStorage.getItem('currentUser'));
		this._usuarioService.getUsuario(this.usuario.id).subscribe(
			response => {
				if (response.code == 200)
					this.usuario = response.data;
					this.opinion.id_usuario = this.usuario.id;
					this.opinion.id_restaurante = this.restaurante.id;
					console.log(this.opinion);
					this.saveOpinion();
				},
				error => {
					console.log(<any>error);	
				}
			);
	}

	saveOpinion() {
		this._restauranteService.addOpinion(this.opinion).subscribe(
			response => {
				if (response.code == 200){
					this._router.navigate(['/restaurantes',this.restaurante.id]);
					location.reload();
				}
				else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	
}