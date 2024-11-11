import { GeneradorID } from "../app/GeneradorID";

export class Sucursal {
  private id: string;
  private direccion: string;
  constructor(direccion: string) {
    this.id = GeneradorID.generarId();
    this.direccion = direccion;
  }

  //Getters
  getId(): string {
    return this.id;
  }
  getDireccion(): string {
    return this.direccion;
  }

  //Setters
  setDireccion(nuevaDireccion) {
    this.direccion = nuevaDireccion;
  }
}
