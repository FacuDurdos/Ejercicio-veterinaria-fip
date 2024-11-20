import * as readlineSync from 'readline-sync';
import { Veterinaria } from "../models/Veterinaria";
import { Paciente } from '../models/Paciente';

function verMascotasPorID(veterinaria: Veterinaria): void {
  if (veterinaria.getClientes().length === 0) {
    console.log("\nNo existen clientes.");
  } else {
    console.log(`\n======= Listado de clientes =======`);
    console.table(veterinaria.getClientes());
    veterinaria.getMascotas();
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




export function menuPacientes(veterinaria: Veterinaria): void {
  let enPacientes = true;
  while (enPacientes) {
    console.log(`\n======= SECCION PACIENTES =======`);
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
        veterinaria.ingresarPaciente()
        break;
      case "4":
        veterinaria.eliminarPaciente();
        break;
      case "5":
        enPacientes = false;
        break;
      default:
        console.error("\nError: Opcion no valida");
        break;
    }
  }
}



