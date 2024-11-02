import { Veterinaria } from "./Veterinaria";
import { Sucursal } from "./Sucursal";
import { Cliente } from "./Cliente";
import { Proveedor } from "./Proveedor";
import { Paciente } from "./Paciente";

export function generarData(): Veterinaria {
    let veterinaria: Veterinaria = new Veterinaria("Veterinaria Olavarria", "Av. Colon 1234");

    veterinaria.ingresarSucursal(new Sucursal("Av. Colon 1234"));
    veterinaria.ingresarSucursal(new Sucursal("Av. Mitre 1234"));
    veterinaria.ingresarSucursal(new Sucursal("Av. Rivadavia 1234"));

    veterinaria.ingresarCliente(new Cliente("Juan Perez", 12345678));
    veterinaria.ingresarCliente(new Cliente("Maria Rodriguez", 87654321));
    veterinaria.ingresarCliente(new Cliente("Carlos Lopez", 13579246));
    veterinaria.ingresarCliente(new Cliente("Ana Garcia", 24681357));

    veterinaria.ingresarPaciente(new Paciente("Paciente A", "perro", 12345678));
    veterinaria.ingresarPaciente(new Paciente("Paciente B", "gato", 87654321));
    veterinaria.ingresarPaciente(new Paciente("Paciente C", "perro", 13579246));
    veterinaria.ingresarPaciente(new Paciente("Paciente D", "gato", 24681357));
    veterinaria.ingresarPaciente(new Paciente("Paciente E", "exotica", 12345678));
    veterinaria.ingresarPaciente(new Paciente("Paciente F", "exotica", 87654321));
    veterinaria.ingresarPaciente(new Paciente("Paciente G", "exotica", 13579246));
    veterinaria.ingresarPaciente(new Paciente("Paciente H", "exotica", 24681357));


    veterinaria.ingresarProveedor(new Proveedor("Proveedor A", 32156489));
    veterinaria.ingresarProveedor(new Proveedor("Proveedor B", 98765432));


    return veterinaria;
}