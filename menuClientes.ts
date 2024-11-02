import * as readlineSync from 'readline-sync';
import { Veterinaria } from "./Veterinaria";
import { Cliente } from './Cliente';
import { Paciente } from './Paciente';

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
        let clientes: Cliente[] = veterinaria.getClientes();
        if (clientes.length === 0) {
          console.log("No existen clientes.");
        } else {
          console.table(clientes);
        }
        break;
      case "2":
        let clienteId: number = readlineSync.questionInt("Ingrese el ID del cliente: ");
        let cliente: Cliente | undefined = veterinaria.getClientes().find((cliente) => cliente.getId() === clienteId);
        if (cliente) {
          let mascotas: Paciente[] = veterinaria.getMascotas(clienteId);
          if (mascotas) {
            console.log(`Las mascotas del cliente ${cliente.getNombre()} son:`);
            console.table(mascotas);
          } else {
            console.log(`No existen mascotas del cliente ${cliente.getNombre()} ID ${clienteId}.`);
          }
        } else {
          console.log(`No existe el cliente ${cliente.getNombre()} ID ${clienteId}.`);
        }
        break;
      case "3":
        let nombre: string = readlineSync.question("Ingrese el nombre del cliente: ");
        let telefono: number = readlineSync.questionInt("Ingrese el telefono del cliente: ");
        let nuevoCliente: Cliente = new Cliente(nombre, telefono);
        veterinaria.ingresarCliente(nuevoCliente);
        console.log("Cliente agregado correctamente.");
        break;
      case "4":
        let clienteIdEliminar: number = readlineSync.questionInt("Ingrese el ID del cliente a eliminar: ");
        veterinaria.eliminarCliente(clienteIdEliminar);
        console.log("Cliente eliminado correctamente.");
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