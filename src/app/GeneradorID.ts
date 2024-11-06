export class GeneradorID {
  private static idGeneradas: number[] = [];

  static generarId(): number {
    let nuevaId : number;
    
    do {
      nuevaId = Math.floor(Math.random() * 99999);
    } while (this.idGeneradas.includes(nuevaId));
    
    this.idGeneradas.push(nuevaId);
    return nuevaId;
  }

  static eliminarId(id: number): void {
    const index = this.idGeneradas.indexOf(id);
    if (index !== -1) {
      this.idGeneradas.splice(index, 1);
    }
  }
}