import { GeneradorID } from "./GeneradorID";

export class Sucursal {
  private id: number;
  private direccion: string;
  constructor(direccion) {
    this.id = GeneradorID.generarId();
    this.direccion = direccion;
  }

  //Getters
  getId(): number {
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
