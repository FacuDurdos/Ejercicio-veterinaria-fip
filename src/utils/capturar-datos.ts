import * as readlineSync from 'readline-sync';

export function solicitarDatos(eleccion: "paciente" | "editar" | "editarSucursal" | "editarPaciente" | "nombre" | "telefono" | "id" | "especie" | "direccion", frase?: string): any {

  switch (eleccion) {

    case "paciente":
      const nombrePaciente: string = readlineSync.question("\nIngrese el nombre de la mascota: ");
      const especie: "perro" | "gato" | "exotica" = readlineSync.question("Ingrese el tipo de la mascota (perro, gato o exotica): ") as "perro" | "gato" | "exotica";
      const clienteId: string = readlineSync.question("Ingrese el ID del duenio de la mascota: ");
      return {nombrePaciente, especie, clienteId};
      
    case "editar":
    const propEditar: string = readlineSync.question(`\nSeleccione que desea editar:
      1. Nombre
      2. Telefono
      3. Direccion
    \nSu eleccion: `);
    return propEditar;

    case "editarSucursal":
    const propEditarSucursal: string = readlineSync.question(`\nSeleccione que desea editar:
      1. Telefono
      2. Direccion
    \nSu eleccion: `);
    return propEditarSucursal;

    case "editarPaciente":
      const propEditarPacientes: string = readlineSync.question(`\nSeleccione que desea editar:
        1. Nombre
        2. Especie
      \nSu eleccion: `);
      return propEditarPacientes;

    case "nombre":
      const nombre: string = readlineSync.question(`\nIngrese el nombre${frase}: `);
      return nombre;

    case "telefono":
      const telefono: number = readlineSync.questionInt(`\nIngrese el telefono${frase}: `);
      return telefono;

    case "id":
      const id: string = readlineSync.question(`\nIngrese el ID${frase}: `);
      return id;

    case "especie":
      const nuevaEspecie: "perro" | "gato" | "exotica" = readlineSync.question(`\nIngrese la especie de la mascota (perro, gato o exotica): `) as "perro" | "gato" | "exotica";
      return nuevaEspecie;

    case "direccion":
      const nuevaDireccion: string = readlineSync.question(`\nIngrese la direccion${frase}: `);
      return nuevaDireccion;

    default:
      console.log("\nOpción no válida");
      return null;
  }
}
