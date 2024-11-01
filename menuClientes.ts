import * as readlineSync from 'readline-sync';
import { Veterinaria } from "./Veterinaria";

export function menuClientes(veterinaria: Veterinaria): void {
  console.log("SECCION CLIENTES");
  let enClientes = true;
    while (enClientes) {
    let nuevaAccion = readlineSync.question(`Seleccione que accion desea realizar:
      1. Ver clientes
      2. Ver mascotas de un cliente
      3. Agregar cliente
      4. Eliminar cliente
      5. Volver
      `);
    switch (nuevaAccion) {
      case "1":
        console.log(veterinaria.getClientes());
        break;
      case "2":
        console.log("VER MASCOTAS DE UN CLIENTE");
        break;
      case "3":
        console.log("AGREGAR CLIENTE");
        break;
      case "4":
        console.log("ELIMINAR CLIENTE");
        break;
      case "5":
        enClientes = false;
        break;
      default:
        console.log("Opcion no valida");
        break;
    }
  }
}