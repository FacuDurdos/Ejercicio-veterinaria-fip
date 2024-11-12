import * as readlineSync from 'readline-sync';
import { Veterinaria } from "../models/Veterinaria";
import { Cliente } from '../models/Cliente';
import { Paciente } from '../models/Paciente';

function verMascotasPorID(veterinaria: Veterinaria): void {
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

function verMascotas(veterinaria: Veterinaria): void {
  let mascotas: Paciente[] = veterinaria.getPacientes();
  if (mascotas.length === 0) {
    console.log("\nNo existen mascotas.");
  } else {
    console.log(`\n======= Listado de mascotas =======`);
    console.table(mascotas);
  }
}

function agregarPaciente(veterinaria: Veterinaria): void {
  let nombre: string = readlineSync.question("Ingrese el nombre de la mascota: ");
  let tipo: string = readlineSync.question("Ingrese el tipo de la mascota (perro, gato o exotica): ");
  let clienteID: string = readlineSync.question("Ingrese el ID del duenio de la mascota: ");

  if (tipo !== "perro" && tipo !== "gato" && tipo !== "exotica") {
    console.error("Error: Tipo de mascota no valido. Por favor, ingrese 'perro', 'gato' o 'exotica'.");
    return;
  } else if (veterinaria.getClientes().find((cliente) => cliente.getId() === clienteID) === undefined) {
      console.error(`Error: No existe el cliente con ID ${clienteID}.`);
      return;
    } else {
      let nuevoPaciente: Paciente = new Paciente(nombre, tipo, clienteID);
      veterinaria.ingresarPaciente(nuevoPaciente);
      console.log("Paciente agregado correctamente.");
  }
}

function eliminarPaciente(veterinaria: Veterinaria): void {
  let nombre: string = readlineSync.question("Ingrese el nombre del paciente: ");
  let clienteId: string = readlineSync.question("Ingrese el ID del cliente a eliminar: ");
  if (veterinaria.getPacientes().find((paciente) => paciente.getId() ===(clienteId) && paciente.getNombre() === nombre)) {
    veterinaria.eliminarPaciente(clienteId, nombre);
    console.log("Paciente eliminado correctamente.");
  } else {
    console.error(`Error: No existe el paciente ${nombre} con ID ${clienteId}.`);
  }
}


export function menuPacientes(veterinaria: Veterinaria): void {
  console.log(`\n======= SECCION PACIENTES =======`);
    let enPacientes = true;
      while (enPacientes) {
      let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
        1. Ver pacientes por cliente
        2. Ver todos los pacientes
        3. Agregar paciente
        4. Eliminar paciente
        5. Volver al menu principal
\nSu eleccion: `);
      switch (nuevaAccion) {
        case "1":
          verMascotasPorID(veterinaria);
          break;
        case "2":
          verMascotas(veterinaria);
          break;
        case "3":
          agregarPaciente(veterinaria)
          break;
        case "4":
          eliminarPaciente(veterinaria);
          break;
        case "5":
          enPacientes = false;
          break;
        default:
          console.error("Error: Opcion no valida");
          break;
      }
    }
  }
  


