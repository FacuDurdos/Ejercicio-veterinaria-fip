import { menuClientes } from "./menuClientes";
import { Veterinaria } from "./Veterinaria";
import * as readlineSync from 'readline-sync';
import { generarData } from "./GenerarData";

let veterinaria = generarData();

function ejecutar(veterinaria: Veterinaria): void {
  let ejecutando: boolean = true;
  console.log(`\nSistema de gestion de ${veterinaria.getNombre()}.`);	
  
  while (ejecutando) {
    let accion = readlineSync.question(`Seleccione que accion desea realizar:
      1. Ir a seccion Clientes
      2. Ir a seccion Pacientes
      3. Ir a seccion Sucursales
      4. Ir a seccion Proveedores
      5. Atender cliente
      6. Modificar datos de la veterinaria
      7. Salir
      `);

    switch (accion) {
      case "1":
        menuClientes(veterinaria);
        break;
      case "2":
        console.log("SECCION PACIENTES");
        break;
      case "3":
        console.log("SECCION SUCURSALES");
        break;
      case "4":
        console.log("SECCION PROVEEDORES");
        break;
      case "5":
        console.log("ATENCION AL PUBLICO");
        break;
      case "6":
        console.log("ADMINISTRAR DATOS VETERINARIA");
        break;
      case "7":
        console.log("Saliendo...");
        ejecutando = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}

ejecutar(veterinaria);