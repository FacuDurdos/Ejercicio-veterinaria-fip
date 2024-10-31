import { GeneradorID } from "./GeneradorID";

export class Proveedor {
  private id: number;
  private nombre: string;
  private telefono: number; 

  constructor(nuevoNombre: string, nuevoTelefono: number) {
    this.id = GeneradorID.generarId();
    this.nombre = nuevoNombre;
    this.telefono = nuevoTelefono;
  }

  //Getters
  public getId(): number {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public getTelefono(): number {
    return this.telefono;
  }

  //Setters
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
  public setTelefono(nuevoTelefono: number): void {
    this.telefono = nuevoTelefono;
  }
}