import * as readlineSync from 'readline-sync';
import { Veterinaria } from "../models/Veterinaria";
import { Cliente } from '../models/Cliente';


function verClientes(veterinaria: Veterinaria): void {
  let clientes: Cliente[] = veterinaria.getClientes();
  if (clientes.length === 0) {
    console.log("\nNo existen clientes.");
  } else {
    console.log(`\n======= Listado de clientes =======`);
    console.table(clientes);
  }
}

function verMascotas(veterinaria: Veterinaria): void {
  if (veterinaria.getClientes().length === 0) {
    console.log("\nNo existen clientes ni mascotas.");
  } else {
    console.table(veterinaria.getClientes());
    veterinaria.getMascotas(); 
  }
}


function modificarTelefono(veterinaria: Veterinaria): void {
  console.table(veterinaria.getClientes());
  let clienteIdModificar: string = readlineSync.question("\nIngrese el ID del cliente a modificar: ");
  let cliente: Cliente | undefined = veterinaria.getClientes().find((cliente) => cliente.getId() === clienteIdModificar);
  if (cliente) {
    let nuevoTelefono: number = readlineSync.questionInt("\nIngrese el nuevo telefono del cliente: ");
    cliente.setTelefono(nuevoTelefono);
    console.log("\nTelefono modificado correctamente.");
  } else if (!cliente) {
    console.error(`\nError: No existe el cliente con ID ${clienteIdModificar}.`);
  }
}

export function menuClientes(veterinaria: Veterinaria): void {
  let enClientes = true;
  while (enClientes) {
    console.log(`\n======= SECCION CLIENTES =======`);
    let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
      1. Ver clientes
      2. Ver mascotas de un cliente
      3. Agregar cliente
      4. Modificar telefono
      5. Eliminar cliente
      6. Volver al menu principal
\nSu eleccion: `);
    switch (nuevaAccion) {
      case "1":
        verClientes(veterinaria);
        break;
      case "2":
        verMascotas(veterinaria);
        break;
      case "3":
        veterinaria.ingresarCliente();
        break;
      case "4":
        modificarTelefono(veterinaria);
        break;
      case "5":
        veterinaria.eliminarCliente();
        break;
      case "6":
        enClientes = false;
        break;
      default:
        console.error("\nError: Opcion no valida");
        break;
    }
  }
}
