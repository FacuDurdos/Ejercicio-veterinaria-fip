import { Cliente } from "../models/Cliente";
import { Paciente } from "../models/Paciente";
import { Proveedor } from "../models/Proveedor";
import { Sucursal } from "../models/Sucursal";
import { solicitarDatos } from '../utils/capturar-datos';

export class VeterinariaFactory {

  public static crear(eleccion: "cliente" | "paciente" | "proveedor" | "sucursal"): any {
    switch (eleccion) {

      case "cliente":
        const nombreCliente: string = solicitarDatos('nombre', ' del cliente');
        const telefonoCliente: number = solicitarDatos('telefono', ' del cliente');
        const direccionCliente: string = solicitarDatos('direccion', ' del cliente');
        return new Cliente(nombreCliente, telefonoCliente, direccionCliente);

      case 'paciente':
        const datosPaciente: { nombrePaciente: string, especie: "perro" | "gato" | "exotica", clienteId: string } = solicitarDatos('paciente');
        if (datosPaciente.especie !== "perro" && datosPaciente.especie !== "gato" && datosPaciente.especie !== "exotica") {
          console.error("Error: Tipo de mascota no valido. Por favor, ingrese 'perro', 'gato' o 'exotica'.");
          return undefined;
          }
        return new Paciente(datosPaciente.nombrePaciente, datosPaciente.especie, datosPaciente.clienteId)

      case 'proveedor':
        const nombreProveedor: string = solicitarDatos('nombre', ' del proveedor');
        const telefonoProveedor: number = solicitarDatos('telefono', ' del proveedor');
        const direccionProveedor: string = solicitarDatos('direccion', ' del proveedor');
        return new Proveedor(nombreProveedor, telefonoProveedor, direccionProveedor);
        
      case 'sucursal':
        const telefonoSucursal: number = solicitarDatos('telefono', ' de la sucursal');
        const direccionSucursal: string = solicitarDatos('direccion', ' de la sucursal');
        return new Sucursal(direccionSucursal, telefonoSucursal);
    }
  }
}