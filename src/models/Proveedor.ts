import { GeneradorID } from "../utils/GeneradorID";

export class Proveedor {
  private id: string;
  private nombre: string;
  private telefono: number;
  private direccion: string;

  constructor(nuevoNombre: string, nuevoTelefono: number, nuevaDireccion: string) {
    this.id = GeneradorID.generarId();
    this.nombre = nuevoNombre;
    this.telefono = nuevoTelefono;
    this.direccion = nuevaDireccion;
  }

  //Getters
  public getId(): string {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public getTelefono(): number {
    return this.telefono;
  }

  public getDireccion(): string {
    return this.direccion;
  }

  //Setters
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
  public setTelefono(nuevoTelefono: number): void {
    this.telefono = nuevoTelefono;
  }

  public setDireccion(nuevaDireccion: string): void {
    this.direccion = nuevaDireccion;
  }
}