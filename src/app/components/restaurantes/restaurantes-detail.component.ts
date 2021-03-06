import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../models/restaurante';
import { Opinion } from '../../models/opinion';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { PropiedadService } from '../../services/propiedad.service';
import { GLOBAL } from '../../services/global';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component ({
	selector: 'restaurantes-detail',
	templateUrl: '../../views/restaurantes/restaurantes-detail.html',
	styleUrls: ['../../app.component.css'],
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
	public admin : boolean = false;
	public confirmado : boolean;
	public hayPeticion : boolean;

	public lat : number;
  	public long : number;
  	public zoom : number;

  	//atributos para la subida de imagenes
 	public filesToUpload: Array<File>;
 	public resultUpload;
 	public cambia : boolean;

  	
 
	constructor (
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _usuarioService: UsuarioService,
		private _auth : AuthService,
		private _propiedadService : PropiedadService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
	) {
		this.opinion = new Opinion(0,0,0,null,'','','');
		this.opinionSingle = new Opinion(0,0,0,0,'','','');
		this.propietario = false;
		this.solicitado = false;
		this.confirmado = false;
		this.hayPeticion = false;
		this.zoom = 11;
		this.toastr.setRootViewContainerRef(vcr);
		this.cambia = false;
	}

	ngOnInit() {
		console.log('Se ha cargado el componente restaurantes-detail.component.ts');

		if (this._auth.authenticated()){
			this.hayUsuario = true;
			this.getUsuario();
			this.getHayPeticion();
		}
		else
			this.hayUsuario = false;

		if (this._auth.authenticated()){
	      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
	      if (this.usuario.admin == true){
	         this.admin = true;
	      } else {
	      	this.admin = false;
	      }
	    }
	    this.getRestaurante();
		this.getOpiniones();
		this.obtenerPropietario();	
		
	}

	getRestaurante(){
		/* recoger el parámetro de la url para sacar el id */
		this._route.params.forEach((params: Params) => {
			let id = params['id'];//recogemos el parametro llamado id de la url
			this._restauranteService.getRestaurante(id).subscribe(
				response => {
						if (response.code == 200){
							this.restaurante = response.data;
							this.lat = Number(response.data.latitud);
							this.long = Number(response.data.longitud);
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
				if (response.code == 200){
					this.usuario = response.data;
					//console.log(this.usuario);
				}
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
						//console.log(this.opiniones);
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

	obtenerPropietario () {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._restauranteService.getPropietarioRestaurante(id).subscribe(
				response => {
					if (response.code == 200 && response.bandera == true){
						this.propietario = true;
						this.userPropi = response.data;
						//console.log(response.data);
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

	seguroBorrar(){
		this.confirmado = true;
	}

	cancelarBorrar(){
		this.confirmado = false;
	}

	eliminarRestaurante(){
		this._restauranteService.deleteRestaurantes(this.restaurante.id).subscribe(
			response => {
				if (response.code == 200) {
					this.toastr.success('El restaurante se ha borraado correctamente.', 'Success!');
					this._router.navigate(['/restaurantes']);
				} else
					this.toastr.error('Error al borrar el restaurante.', 'Oops!');
			}, 
			error => {
				console.log(<any>error);
				}
			);
	}

	solicitarPropiedad(id){
		this._propiedadService.nuevaSolicitud(this.usuario.id, id).subscribe(
			response => {
				if (response.code == 200){
					this.solicitado = false;
					this.hayPeticion = true;
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

	getHayPeticion (){
		this._route.params.forEach((params: Params) => {
			let id_rest = params['id'];
			this._propiedadService.obtenerSiHayPeticion(this.usuario.id, id_rest).subscribe(
				response => {
					if (response.code == 200)
						if (response.hayPeticion == true){
							this.hayPeticion = true;
							//console.log(this.hayPeticion);
						}
						else
							this.hayPeticion = false;
					else
						console.log(response);
				},
				error => {
					console.log(<any>error);
				}
			);
		});
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
					//console.log(this.opinion);
					this.saveOpinion();
				},
				error => {
					console.log(<any>error);	
				}
			);
	}

	saveOpinion() {
		if (this.filesToUpload && this.filesToUpload.length >= 1){
			this._restauranteService.makeFileRequest(GLOBAL.urlopinionesRestaurantes+'upload-images', [], this.filesToUpload).then((result) => {
				this.resultUpload = result;
				this.opinion.imagen = this.resultUpload.filename;
				//console.log(this.resultUpload);
				this.newOpinion();
				
			},
			(error) => {
				console.log(error);
			});
		}
		else {
			this.newOpinion();
		}
	}

	newOpinion() {
		this._restauranteService.addOpinion(this.opinion).subscribe(
			response => {
				if (response.code == 200){
					this._router.navigate(['/restaurantes',this.restaurante.id]);
					this.toastr.success('Opinión realizada correctamente', 'Success!');
					this.getOpiniones();
					//location.reload();
				}
				else {
					this.toastr.error('Ha habido un problema al dejar la opinión, inténtelo de nuevo', 'Oops!');
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	//este método va a ser llamado cuando hagamos el evento change en el campo input file 
	fileChangeEvent (fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);		
	}
}