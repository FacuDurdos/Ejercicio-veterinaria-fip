import { Veterinaria } from "../models/Veterinaria";
import { Sucursal } from "../models/Sucursal";
import { Cliente } from "../models/Cliente";
import { Proveedor } from "../models/Proveedor";
import { Paciente } from "../models/Paciente";

export function generarData(): Veterinaria {
    let veterinaria: Veterinaria = new Veterinaria("Veterinaria Olavarria", "Av. Colon 1234");

    veterinaria.ingresarSucursal(new Sucursal("Mitre 1234"));
    veterinaria.ingresarSucursal(new Sucursal("Rivadavia 1234"));

    let juanPerez = new Cliente("Juan Perez", 12345678);
    veterinaria.ingresarCliente(juanPerez);
    let mariaRodriguez = new Cliente("Maria Rodriguez", 87654321);
    veterinaria.ingresarCliente(mariaRodriguez);
    let carlosLopez = new Cliente("Carlos Lopez", 13579246);
    veterinaria.ingresarCliente(carlosLopez);
    let anaGarcia = new Cliente("Ana Garcia", 24681357);
    veterinaria.ingresarCliente(anaGarcia);


    veterinaria.ingresarPaciente(new Paciente("Paciente A", "perro", juanPerez.getId()));
    veterinaria.ingresarPaciente(new Paciente("Paciente B", "gato", mariaRodriguez.getId()));
    veterinaria.ingresarPaciente(new Paciente("Paciente C", "perro", carlosLopez.getId()));
    veterinaria.ingresarPaciente(new Paciente("Paciente D", "gato", anaGarcia.getId()));
    veterinaria.ingresarPaciente(new Paciente("Paciente E", "exotica", juanPerez.getId()));
    veterinaria.ingresarPaciente(new Paciente("Paciente F", "exotica", mariaRodriguez.getId()));
    veterinaria.ingresarPaciente(new Paciente("Paciente G", "exotica", carlosLopez.getId()));
    veterinaria.ingresarPaciente(new Paciente("Paciente H", "exotica", anaGarcia.getId()));


    veterinaria.ingresarProveedor(new Proveedor("Proveedor A", 32156489));
    veterinaria.ingresarProveedor(new Proveedor("Proveedor B", 98765432));



    //Paciente sin duenio
    veterinaria.ingresarPaciente(new Paciente("Paciente I", "perro", "0"));
    

    return veterinaria;
}