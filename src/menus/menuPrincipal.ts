import * as readlineSync from "readline-sync";
import { Veterinaria } from "../models/Veterinaria";
import { menuClientes } from "./menuClientes";
import { menuPacientes } from "./menuPacientes";

import { menuProveedor } from "./menuProveedor";

import { menuAtender } from "./menuAtender";


export function menuPrincipal(veterinaria: Veterinaria) {
let enPrincipal: boolean = true;
console.log(`\nSistema de gestion de ${veterinaria.getNombre()}.`);	
  
  while (enPrincipal) {
    let accion = readlineSync.question(`Seleccione que accion desea realizar:
      1. Ir a seccion Clientes
      2. Ir a seccion Pacientes
      3. Ir a seccion Sucursales
      4. Ir a seccion Proveedores
      5. Atender cliente
      6. Salir
      `);

    switch (accion) {
      case "1":
        menuClientes(veterinaria);
        break;
      case "2":
        menuPacientes(veterinaria);
        break;
      case "3":
        console.log("SECCION SUCURSALES");
        break;
      case "4":
        menuProveedor(veterinaria)
        break;
      case "5":
        menuAtender(veterinaria);
        break;
      case "6":
        console.log("Saliendo...");
        enPrincipal = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}