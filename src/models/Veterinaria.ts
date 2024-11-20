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


  public atender(): void {
    console.table(this.getClientes());
    let clienteId: string = readlineSync.question(`\nIngrese el ID del cliente que desea atender: `);
    let cliente: Cliente | undefined = this.verificarCliente(clienteId);
    if (cliente) {
      console.table(this.getPacientes());
      let nombreMascota: string = readlineSync.question("\nIngrese el nombre de la mascota: ");
      let mascota = this.getPacientes().find((mascota) => mascota.getNombre() === nombreMascota);
      if (!mascota) {
        console.error(`\nError: No existe la mascota con el nombre ${nombreMascota} del cliente ${cliente.getNombre()} con ID ${clienteId}.`);
      } else {
        cliente.setVisitas();
        console.log(`\nSe atendio al cliente ${cliente.getNombre()}. Total visitas: ${cliente.getVisitas()}`);
      }
    } else {
      console.error(`\nError: El cliente con ID ${clienteId} no existe.`);
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
    const clienteId = readlineSync.question("\nIngrese el id del cliente: ")
    let cliente: Cliente | undefined = this.verificarCliente(clienteId);
    if (cliente instanceof Cliente) {
      let mascotas: Paciente[] = this.pacientes.filter((mascota) => mascota.getId() === clienteId);
      if (mascotas.length > 0) {
        console.log(`\nLas mascotas del cliente ${cliente.getNombre()} con ID ${clienteId} son: ${mascotas.map(m => m.getNombre()).join(", ")}.`);
        return mascotas;
      } else {
        console.error(`\nError: No existen mascotas del cliente con ID ${clienteId}.`);
        return;
      }
    } else {
      console.error(`\nError: El cliente con ID ${clienteId} no existe.`);
      return;
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
    const direccionSucursal: string = readlineSync.question(`\nIngrese la direccion de la sucursal a ingresar: `)
    const telefono: number = readlineSync.questionInt("Ingrese el telefono de la sucursal: ");
    const sucursal: Sucursal = new Sucursal(direccionSucursal, telefono)
    this.sucursales.push(sucursal);
    console.log(`\nSe agrego la sucursal de ${sucursal.getDireccion()} correctamente.`);
  }

  public ingresarProveedor(): void {
    const nombre: string = readlineSync.question("\nIngrese el nombre del proveedor: ");
    const telefono: number = readlineSync.questionInt("Ingrese el telefono del proveedor: ");
    const nuevoProveedor: Proveedor = new Proveedor(nombre, telefono)
    this.proveedores.push(nuevoProveedor);
    console.log(`\nSe agrego el proveedor ${nuevoProveedor.getNombre()} correctamente.`);
  }


  public ingresarCliente(): void {
    const nombre: string = readlineSync.question("\nIngrese el nombre del cliente: ");
    const telefono: number = readlineSync.questionInt("Ingrese el telefono del cliente: ");
    const nuevoCliente: Cliente = new Cliente(nombre, telefono)
    this.clientes.push(nuevoCliente);
    console.log(`\nSe agrego el cliente ${nuevoCliente.getNombre()} correctamente.`);
  }

  public ingresarPaciente(): void {
    console.table(this.getClientes());
    let nombre: string = readlineSync.question("\nIngrese el nombre de la mascota: ");
    let tipo: string = readlineSync.question("Ingrese el tipo de la mascota (perro, gato o exotica): ");
    let clienteID: string = readlineSync.question("Ingrese el ID del duenio de la mascota: ");
    if (tipo !== "perro" && tipo !== "gato" && tipo !== "exotica") {
      console.error("\nError: Tipo de mascota no valido. Por favor, ingrese 'perro', 'gato' o 'exotica'.");
      return;
    } else if (this.getClientes().find((cliente) => cliente.getId() === clienteID) === undefined) {
      console.error(`\nError: No existe el cliente con ID ${clienteID}.`);
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
    console.table(this.getSucursales());
    const sucursalId = readlineSync.question("\nIngrese el id de la sucursal: ")
    if (this.verificarSucursal(sucursalId)) {
      this.sucursales = this.sucursales.filter((sucursal) => sucursal.getId() !== sucursalId);
      GeneradorID.eliminarId(sucursalId);
      console.log(`\nSe elimino la sucursal con ID ${sucursalId} correctamente.`);
    } else {
      console.error(`\nError: La sucursal con ID ${sucursalId} no existe.`);
    }
  }
  public eliminarProveedor(): void {
    console.table(this.getProveedores());
    const proveedorId = readlineSync.question("\nIngrese el id del proveedor: ");
    if (this.verificarProveedor(proveedorId)) {
      this.proveedores = this.proveedores.filter((proveedor) => proveedor.getId() !== proveedorId);
      GeneradorID.eliminarId(proveedorId);
      console.log(`\nSe elimino el proveedor con ID ${proveedorId} correctamente.`);
    } else {
      console.error(`\nError: El proveedor con ID ${proveedorId} no existe.`);
    }
  }

  public eliminarCliente(): void {
    console.table(this.getClientes());
    const clienteId = readlineSync.question("\nIngrese el id del cliente: ");
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
    console.table(this.getPacientes());
    const pacienteId: string = readlineSync.question(`\nIngrese el id del paciente a eliminar: `);
    const pacienteNombre: string = readlineSync.question(`Ingrese el nombre del paciente a eliminar: `);
    const paciente: Paciente | undefined = this.getPacientes().find(paciente => paciente.getId() === pacienteId)
    if (this.verificarPaciente(pacienteId) && paciente?.getNombre() === pacienteNombre) {
      this.pacientes = this.pacientes.filter((paciente) => !(paciente.getId() === pacienteId && paciente.getNombre() === pacienteNombre));
      console.log(`\nSe elimino el paciente ${paciente.getNombre()} con ID ${pacienteId} correctamente.`);
    } else {
      console.error(`\nError: El paciente ${pacienteNombre} con ID ${pacienteId} no existe.`);
    }
  }

  //Metodos internos
  private verificarCliente(clienteId: string): Cliente | undefined {
    const cliente: Cliente | undefined = this.clientes.find((cliente) => cliente.getId() === clienteId);
    return cliente;
  }

  private verificarProveedor(proveedorId: string): Proveedor | undefined {
    const proveedor: Proveedor | undefined = this.proveedores.find((proveedor) => proveedor.getId() === proveedorId);
    if (proveedor) {
      return proveedor;
    } else {
      `\nError: No existe el proveedor con ID ${proveedorId}.`;
    }
  }

  private verificarSucursal(sucursalId: string): Sucursal | undefined {
    const sucursal: Sucursal | undefined = this.sucursales.find((sucursal) => sucursal.getId() === sucursalId);
    if (sucursal) {
      return sucursal;
    } else {
      `\nError: No existe la sucursal con ID ${sucursalId}.`;
    }
  }

  private verificarPaciente(pacienteId: string): Paciente | undefined {
    const paciente: Paciente | undefined = this.pacientes.find((paciente) => paciente.getId() === pacienteId);
    if (paciente) {
      return paciente;
    } else {
      `\nError: No existe el paciente con ID ${pacienteId}.`;
    }
  }
}