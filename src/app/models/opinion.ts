export class Opinion {
	constructor (
		public id : number,
		public id_restaurante : number,
		public id_usuario : number,
		public puntuacion : number,
		public fecha : string,
		public mensaje : string,
		public imagen : string
		) {}
}