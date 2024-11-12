import * as readlineSync from "readline-sync";
import { Veterinaria } from "../models/Veterinaria";
import { Proveedor } from "../models/Proveedor";


function verProveedores(veterinaria: Veterinaria): void {
    let proveedores: Proveedor[] = veterinaria.getProveedores();
    if (proveedores.length === 0) {
      console.log("\nNo existen proveedores.");
    } else {
      console.log(`\n======= Listado de proveedores =======`);
      console.table(proveedores);
    }
  }

  function agregarProveedor(veterinaria: Veterinaria): void {
    let nombre: string = readlineSync.question("Ingrese el nombre del proveedor: ");
    let telefono: number = readlineSync.questionInt("Ingrese el telefono del proveedor: ");
    let nuevoProveedor: Proveedor = new Proveedor(nombre, telefono); // veterinariaFactory.ingresarCliente(nombre, telefono);
    veterinaria.ingresarProveedor(nuevoProveedor);
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

  function editarProveedor(veterinaria: Veterinaria): void {
    let proveedorId: string = readlineSync.question("Ingrese el ID del proveedor a editar: ");
    let proveedor: Proveedor | undefined = veterinaria.getProveedores().find((proveedor) => proveedor.getId() === proveedorId);
    if (proveedor) {
      let editar: string = readlineSync.question(`Seleccione que desea editar:
        1. Nombre
        2. Telefono
        `);
      switch (editar) {
        case "1":
          let nuevoNombre: string = readlineSync.question("Ingrese el nuevo nombre del proveedor: ");
          proveedor.setNombre(nuevoNombre);
          console.log("Proveedor editado correctamente.");
          break;
        case "2":
          let nuevoTelefono: number = readlineSync.questionInt("Ingrese el nuevo telefono del proveedor: ");
          proveedor.setTelefono(nuevoTelefono);
          console.log("Proveedor editado correctamente.");
          break;
        default:
          console.error("Error: Opcion no valida");
          break;
      }
    } else {
      console.error(`Error: No existe el proveedor con ID ${proveedorId}.`);
    }
  }



  export function menuProveedor(veterinaria: Veterinaria): void {
    console.log(`\n======= SECCION PROVEEDORES =======`);
    let enProveedores = true;
      while (enProveedores) {
      let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
        1. Ver proveedores
        2. Agregar proveedor
        3. Editar proveedor
        4. Eliminar proveedor
        5. Volver al menu principal
\nSu eleccion: `);
      switch (nuevaAccion) {
        case "1":
          verProveedores(veterinaria);
          break;
        case "2":
          agregarProveedor(veterinaria);
          break;
        case "3":
          editarProveedor(veterinaria);
          break;
        case "4":
          eliminarProveedor(veterinaria);
          break;
        case "5":
            enProveedores = false;
          break;
        default:
          console.error("Error: Opcion no valida");
          break;
      }
    }
  }