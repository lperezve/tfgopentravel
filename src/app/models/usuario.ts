export class Usuario {
	constructor (
		public id : number,
		public nombre : string,
		public apellido1 : string,
		public apellido2 : string,
		public alias : string,
		public email : string,
		public password : string,
		public rol_publicador : boolean
		) {}
}