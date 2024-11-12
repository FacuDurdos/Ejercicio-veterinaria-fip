import * as readlineSync from 'readline-sync';
import { Sucursal } from '../models/Sucursal';
import { Veterinaria } from '../models/Veterinaria';

function verSucursales(veterinaria: Veterinaria): void {
  let sucursales: Sucursal[] = veterinaria.getSucursales();
  if (sucursales.length === 0) {
    console.log("\nNo existen sucursales.");
  } else {
    console.log(`\n======= Listado de sucursales =======`);
    console.table(sucursales);
  }
}

function agregarSucursal(veterinaria: Veterinaria): void {
  let direccion: string = readlineSync.question("Ingrese la direccion de la nueva sucursal: ");
  let nuevaSucursal: Sucursal = new Sucursal(direccion);
  veterinaria.ingresarSucursal(nuevaSucursal);
}

function editarSucursal(veterinaria: Veterinaria): void {
  let sucursalId: string = readlineSync.question("Ingrese el ID de la sucursal a editar: ");
  let nuevaDireccion: string = readlineSync.question("Ingrese la nueva direccion de la sucursal: ");
  let sucursal: Sucursal | undefined = veterinaria.getSucursales().find((sucursal) => sucursal.getId() === sucursalId);
  if (sucursal) {
    sucursal.setDireccion(nuevaDireccion);
    console.log("Direccion de la sucursal editada correctamente.");
  } else {
    console.error(`Error: No existe la sucursal con ID ${sucursalId}.`);
  }
}

function eliminarSucursal(veterinaria: Veterinaria): void {
  let sucursalId: string = readlineSync.question("Ingrese el ID de la sucursal a eliminar: ");
  let sucursal: Sucursal | undefined = veterinaria.getSucursales().find((sucursal) => sucursal.getId() === sucursalId);
  if (sucursal) {
    veterinaria.eliminarSucursal(sucursalId);
  } else {
    console.error(`Error: No existe la sucursal con ID ${sucursalId}.`);
  }
}

export function menuSucursal(veterinaria: Veterinaria): void {
  console.log(`\n======= SECCION SUCURSALES =======`);
  let enSucursales = true;
  while (enSucursales) {
    let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
      1. Ver sucursales
      2. Agregar sucursal
      3. Editar direccion de sucursal
      4. Eliminar sucursal
      5. Volver al menu principal
\nSu eleccion: `);
    switch (nuevaAccion) {
      case "1":
        verSucursales(veterinaria);
        break;
      case "2":
        agregarSucursal(veterinaria);
        break;
      case "3":
        editarSucursal(veterinaria);
        break;
      case "4":
        eliminarSucursal(veterinaria);
        break;
      case "5":
        enSucursales = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}