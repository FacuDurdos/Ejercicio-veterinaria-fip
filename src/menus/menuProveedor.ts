import * as readlineSync from "readline-sync";
import { Veterinaria } from "../models/Veterinaria";
import { Proveedor } from "../models/Proveedor";


function verProveedor(veterinaria: Veterinaria): void {
    let proveedor: Proveedor[] = veterinaria.getProveedores();
    if (proveedor.length === 0) {
      console.log("No existen proveedores.");
    } else {
      console.table(proveedor);
    }
  }

  function agregarProveedor(veterinaria: Veterinaria): void {
    let nombre: string = readlineSync.question("Ingrese el nombre del proveedor: ");
    let telefono: number = readlineSync.questionInt("Ingrese el telefono del proveedor: ");
    let nuevoProveedor: Proveedor = new Proveedor(nombre, telefono); // veterinariaFactory.ingresarCliente(nombre, telefono);
    veterinaria.ingresarProveedor(nuevoProveedor);
    console.log("Proveedor agregado correctamente.");
  }



  function eliminarProveedor(veterinaria: Veterinaria): void {
    let ProveedorIdEliminar: string = readlineSync.question("Ingrese el ID del proveedor a eliminar: ");
    if (veterinaria.getProveedores().find((proveedor) => proveedor.getId() ===(ProveedorIdEliminar))) {
      veterinaria.eliminarProveedor(ProveedorIdEliminar);
      console.log("Proveedor eliminado correctamente.");
    } else {
      console.error(`Error: No existe el proveedor con ID ${ProveedorIdEliminar}.`);
    }
  }



  export function menuProveedor(veterinaria: Veterinaria): void {
    console.log("SECCION PROVEEDORES");
    let enProveedores = true;
      while (enProveedores) {
      let nuevaAccion = readlineSync.question(`Seleccione que accion desea realizar:
        1. Ver proveedor
        2. Agregar proveedor
        3. Eliminar proveedor
        4. Volver al menu principal
        `);
      switch (nuevaAccion) {
        case "1":
          verProveedor(veterinaria);
          break;
        case "2":
          agregarProveedor(veterinaria);
          break;
        case "3":
          eliminarProveedor(veterinaria);
          break;
        case "4":
            enProveedores = false;
          break;
        default:
          console.error("Error: Opcion no valida");
          break;
      }
    }
  }