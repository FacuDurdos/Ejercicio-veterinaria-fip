export class Paciente {
  private id: string;
  private nombre: string;
  private especie: "perro" | "gato" | "exotica";

  constructor(nuevoNombre: string, nuevaEspecie: "perro" | "gato" | "exotica", clienteId: string) {
    this.id = clienteId;
    this.nombre = nuevoNombre;
    this.especie = nuevaEspecie;
  }

  //Getters
  public getId(): string {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public getEspecie(): "perro" | "gato" | "exotica" {
    return this.especie;
  }

  //Setters
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
  public setEspecie(nuevaEspecie: "perro" | "gato" | "exotica"): void {
    this.especie = nuevaEspecie;
  }
}