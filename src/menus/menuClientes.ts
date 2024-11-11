//TODO: FACTORY METHOD para crear clientes. veterinariaFactory.crearCliente("Juan Perez", 12345678);


import * as readlineSync from 'readline-sync';
import { Veterinaria } from "../models/Veterinaria";
import { Cliente } from '../models/Cliente';
import { Paciente } from '../models/Paciente';

function verClientes(veterinaria: Veterinaria): void {
  let clientes: Cliente[] = veterinaria.getClientes();
  if (clientes.length === 0) {
    console.log("No existen clientes.");
  } else {
    console.table(clientes);
  }
}

function verMascotas(veterinaria: Veterinaria): void {
  let clienteId: string = readlineSync.question("Ingrese el ID del cliente: ");
  let cliente: Cliente | undefined = veterinaria.getClientes().find((cliente) => cliente.getId() === clienteId);
  if (cliente) {
    let mascotas: Paciente[] = veterinaria.getMascotas(clienteId);
    if (mascotas) {
      console.log(`Las mascotas del cliente ${cliente.getNombre()} son:`);
      console.table(mascotas);
    } else {
      console.error(`Error: No existen mascotas del cliente ${cliente.getNombre()} ID ${clienteId}.`);
    }
  } else {
    console.error(`Error: No existe el cliente con ID ${clienteId}.`);
  }
}

function agregarCliente(veterinaria: Veterinaria): void {
  let nombre: string = readlineSync.question("Ingrese el nombre del cliente: ");
  let telefono: number = readlineSync.questionInt("Ingrese el telefono del cliente: ");
  let nuevoCliente: Cliente = new Cliente(nombre, telefono); // veterinariaFactory.crearCliente(nombre, telefono);
  veterinaria.ingresarCliente(nuevoCliente);
  console.log("Cliente agregado correctamente.");
}

function eliminarCliente(veterinaria: Veterinaria): void {
  let clienteIdEliminar: string = readlineSync.question("Ingrese el ID del cliente a eliminar: ");
  if (veterinaria.getClientes().find((cliente) => cliente.getId() ===(clienteIdEliminar))) {
    veterinaria.eliminarCliente(clienteIdEliminar);
    console.log("Cliente eliminado correctamente.");
  } else {
    console.error(`Error: No existe el cliente con ID ${clienteIdEliminar}.`);
  }
}

export function menuClientes(veterinaria: Veterinaria): void {
  console.log("SECCION CLIENTES");
  let enClientes = true;
    while (enClientes) {
    let nuevaAccion = readlineSync.question(`Seleccione que accion desea realizar:
      1. Ver clientes
      2. Ver mascotas de un cliente
      3. Agregar cliente
      4. Eliminar cliente
      5. Volver al menu principal
      `);
    switch (nuevaAccion) {
      case "1":
        verClientes(veterinaria);
        break;
      case "2":
        verMascotas(veterinaria);
        break;
      case "3":
        agregarCliente(veterinaria);
        break;
      case "4":
        eliminarCliente(veterinaria);
        break;
      case "5":
        enClientes = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}
