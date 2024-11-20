import * as readlineSync from "readline-sync";
import { Veterinaria } from "../models/Veterinaria";
import { menuClientes } from "./menuClientes";
import { menuPacientes } from "./menuPacientes";
import { menuProveedor } from "./menuProveedor";
import { menuAtender } from "./menuAtender";
import { menuSucursal } from "./menuSucursales";


export function menuPrincipal(veterinaria: Veterinaria) {
  let enPrincipal: boolean = true;
  console.log(`\n======= Sistema de gestion de ${veterinaria.getNombre()} =======`);


  while (enPrincipal) {
    console.log(`\n======= MENU PRINCIPAL =======`);
    let accion = readlineSync.question(`\nSeleccione que accion desea realizar:
        1. Ir a seccion Clientes
        2. Ir a seccion Pacientes
        3. Ir a seccion Sucursales
        4. Ir a seccion Proveedores
        5. Atender cliente
        6. Salir
\nSu eleccion: `);

    switch (accion) {
      case "1":
        menuClientes(veterinaria);
        break;
      case "2":
        menuPacientes(veterinaria);
        break;
      case "3":
        menuSucursal(veterinaria);
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
        console.error("\nError: Opcion no valida");
        break;
    }
  }
}