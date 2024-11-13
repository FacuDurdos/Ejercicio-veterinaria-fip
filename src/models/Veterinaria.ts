import * as readlineSync from 'readline-sync';
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";
import { Proveedor } from "./Proveedor";
import { Sucursal } from "./Sucursal";
import { GeneradorID } from "../app/GeneradorID";

export class Veterinaria {
  private nombre: string;
  private direccion: string;
  private id: string;
  private sucursales: Array<Sucursal>;
  private clientes: Array<Cliente>;
  private pacientes: Array<Paciente>;
  private proveedores: Array<Proveedor>;

  constructor(nuevoNombre: string, nuevaDireccion: string) {
    this.id = GeneradorID.generarId();
    this.nombre = nuevoNombre;
    this.direccion = nuevaDireccion;
    this.sucursales = [];
    this.clientes = [];
    this.proveedores = [];
    this.pacientes = [];
  }


  public atender(clienteId: string): void {
    if (!this.verificarCliente(clienteId)) {
      console.error(`Error: El cliente con ID ${clienteId} no existe.`);
    } else {
      let cliente: Cliente | undefined = this.clientes.find((cliente) => cliente.getId() === clienteId);
      if (cliente) {
        cliente.setVisitas();
        console.log(`El cliente con ID ${clienteId} se encuentra en atencion.`);
      }
    }
  }

  //Getters
  public getId(): string {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  } 
  public getDireccion(): string {    
    return this.direccion;  
  }
  public getSucursales(): Array<Sucursal> {
    return this.sucursales;
  }
  public getPacientes(): Array<Paciente> {
    return this.pacientes;
  }
  public getProveedores(): Array<Proveedor> {
    return this.proveedores;
  }
  public getClientes(): Array<Cliente> {
    return this.clientes;
  }


  public getMascotas(): Paciente[] | undefined {
    const clienteId = readlineSync.question("Ingrese el id del cliente: ")
    if (!this.verificarCliente(clienteId)) {
      console.error(`Error: El cliente con ID ${clienteId} no existe.`);
      return undefined;
    } else {
      let mascotas: Paciente[] = this.pacientes.filter((mascota) => mascota.getId() === clienteId);
      if (mascotas.length > 0) {
        console.log(`Las mascotas del cliente con ID ${clienteId} son: ${mascotas.map(m => m.getNombre()).join(", ")}.`);
        return mascotas;
      } else {
        console.error(`Error: No existen mascotas del cliente con ID ${clienteId}.`);
        return undefined;
      }
    }
  }

  //Setters
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
  public setDireccion(nuevaDireccion: string): void {
    this.direccion = nuevaDireccion;
  }

  //Metodos add
  public ingresarSucursal(): void {
    const direccionSucursal: string = readlineSync.question(`Ingrese la direccion de la sucursal a ingresar: `)
    const sucursal: Sucursal = new Sucursal(direccionSucursal)
      if (this.verificarSucursal(sucursal.getId())) {
        console.error(`\nError: La sucursal con ID ${sucursal.getId()} ya existe.`);
        return;
      } else {
        this.sucursales.push(sucursal);
        console.log(`\nSe agrego la sucursal de ${sucursal.getDireccion()} correctamente.`);
      }
  }

  public ingresarProveedor(): void {
    const nombre: string = readlineSync.question("Ingrese el nombre del proveedor: ");
    const telefono: number = readlineSync.questionInt("Ingrese el telefono del proveedor: ");
    const nuevoProveedor: Proveedor = new Proveedor(nombre,telefono)
    if (this.verificarProveedor(nuevoProveedor.getId())) {
    console.error(`\nError: El proveedor con ID ${nuevoProveedor.getId()} ya existe.`);
    } else {
      this.proveedores.push(nuevoProveedor);
      console.log(`\nSe agrego el proveedor ${nuevoProveedor.getNombre()} correctamente.`);
    }
  }

  public ingresarCliente(): void {
    const nombre: string = readlineSync.question("Ingrese el nombre del cliente: ");
    const telefono: number = readlineSync.questionInt("Ingrese el telefono del cliente: ");
    const nuevoCliente : Cliente = new Cliente(nombre,telefono)
    if (this.verificarCliente(nuevoCliente.getId())) {
      console.error(`\nError: El cliente con ID ${nuevoCliente.getId()} ya existe.`);
    } else {
      this.clientes.push(nuevoCliente);
      console.log(`\nSe agrego el cliente ${nuevoCliente.getNombre()} correctamente.`); 
    }
  }

  public ingresarPaciente(): void {
    let nombre: string = readlineSync.question("Ingrese el nombre de la mascota: ");
    let tipo: string = readlineSync.question("Ingrese el tipo de la mascota (perro, gato o exotica): ");
    let clienteID: string = readlineSync.question("Ingrese el ID del duenio de la mascota: ");

    if (tipo !== "perro" && tipo !== "gato" && tipo !== "exotica") {
      console.error("Error: Tipo de mascota no valido. Por favor, ingrese 'perro', 'gato' o 'exotica'.");
      return;
    } else if (this.getClientes().find((cliente) => cliente.getId() === clienteID) === undefined) {
      console.error(`Error: No existe el cliente con ID ${clienteID}.`);
      return;
    } else {
      let nuevoPaciente: Paciente = new Paciente(nombre, tipo, clienteID);
      if (!this.verificarCliente(nuevoPaciente.getId())) {
        console.error(`\nError: No existe el duenio de ${nuevoPaciente.getNombre()}.`);
      } else {
        this.pacientes.push(nuevoPaciente);
        console.log(`\nSe agrego el paciente ${nuevoPaciente.getNombre()} correctamente.`);
      }
    }
  }

  //Metodos delete
  public eliminarSucursal(): void {
    const sucursalId = readlineSync.question("Ingrese el id de la sucursal: ")
    if (this.verificarSucursal(sucursalId)) {
      this.sucursales = this.sucursales.filter((sucursal) => sucursal.getId() !== sucursalId);
      GeneradorID.eliminarId(sucursalId);
      console.log(`\nSe elimino la sucursal con ID ${sucursalId} correctamente.`);
    } else {
      console.error(`\nError: La sucursal con ID ${sucursalId} no existe.`);
    }
  }
  public eliminarProveedor(): void {
    const proveedorId = readlineSync.question("Ingrese el id del proveedor: ");
    if (this.verificarProveedor(proveedorId)) {
      this.proveedores = this.proveedores.filter((proveedor) => proveedor.getId() !== proveedorId);
      GeneradorID.eliminarId(proveedorId);
      console.log(`\nSe elimino el proveedor con ID ${proveedorId} correctamente.`);
    } else {
      console.error(`\nError: El proveedor con ID ${proveedorId} no existe.`);
  }
}

  public eliminarCliente(): void {
    const clienteId = readlineSync.question("Ingrese el id del cliente: ");
    if (this.verificarCliente(clienteId)) {
      this.clientes = this.clientes.filter((cliente) => cliente.getId() !== clienteId);
      this.pacientes = this.pacientes.filter((mascota) => mascota.getId() !== clienteId);
      GeneradorID.eliminarId(clienteId);
      console.log(`\nSe elimino el cliente con ID ${clienteId} y sus mascotas correctamente.`);
    } else {
      console.error(`\nError: El cliente con ID ${clienteId} no existe.`);
    }
  }

  public eliminarPaciente(): void {
    const pacienteId: string = readlineSync.question(`\nIngrese el id del paciente a eliminar: 
    Su eleccion: `);
    const paciente: Paciente | undefined = this.getPacientes().find(paciente => paciente.getId() === pacienteId)
    if (this.verificarPaciente(pacienteId)) {
      this.pacientes = this.pacientes.filter((paciente) => !(paciente.getId() === pacienteId && paciente.getNombre() === paciente.getNombre()));
      console.log(`\nSe elimino el paciente ${paciente.getNombre()} con ID ${pacienteId} correctamente.`);
    } else {
      console.error(`\nError: El paciente ${paciente.getNombre()} con ID ${pacienteId} no existe.`);
    }
  }

  //Metodos internos
  private verificarCliente(clienteId: string): boolean {
    return this.clientes.some((cliente) => cliente.getId() === clienteId);
  }

  private verificarProveedor(proveedorId: string): boolean {
    return this.proveedores.some((proveedor) => proveedor.getId() === proveedorId);
  }

  private verificarSucursal(sucursalId: string): boolean {
    return this.sucursales.some((sucursal) => sucursal.getId() === sucursalId);
  }

  private verificarPaciente(pacienteId: string): boolean {
    return this.pacientes.some((paciente) => paciente.getId() === pacienteId);
  }
}