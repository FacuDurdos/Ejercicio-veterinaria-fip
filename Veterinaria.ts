/* atender (aumenta visitas del cliente), getDueño (para obtener el dueño de una mascota),
  getMascotas (para obtener las mascotas de un dueño) */

import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";
import { Proveedor } from "./Proveedor";
import { Sucursal } from "./Sucursal";
import { GeneradorID } from "./GeneradorID";

export class Veterinaria {
  private nombre: string;
  private direccion: string;
  private id: number;
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

  //Getters
  public getId(): number {
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

  //Setters
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
  public setDireccion(nuevaDireccion: string): void {
    this.direccion = nuevaDireccion;
  }

  //Metodos add
  public ingresarSucursal(nuevaSucursal: Sucursal): void {
    if (this.verificarSucursal(nuevaSucursal.getId())) {
      console.error(`Error: La sucursal con ID ${nuevaSucursal.getId()} ya existe.`);
      return;
    } else {
      this.sucursales.push(nuevaSucursal);
      console.log(`Se agrego la sucursal de ${nuevaSucursal.getDireccion()} correctamente.`);
    }
  }

  public ingresarProveedor(nuevoProveedor: Proveedor): void {
    if (this.verificarProveedor(nuevoProveedor.getId())) {
    console.error(`Error: El proveedor con ID ${nuevoProveedor.getId()} ya existe.`);
    } else {
      this.proveedores.push(nuevoProveedor);
      console.log(`Se agrego el proveedor ${nuevoProveedor.getNombre()} correctamente.`);
    }
  }

  public ingresarCliente(nuevoCliente: Cliente): void {
    if (this.verificarCliente(nuevoCliente.getId())) {
      console.error(`Error: El cliente con ID ${nuevoCliente.getId()} ya existe.`);
    } else {
      this.clientes.push(nuevoCliente);
      console.log(`Se agrego el cliente ${nuevoCliente.getNombre()} correctamente.`); 
    }
  }

  public ingresarPaciente(nuevoPaciente: Paciente): void {
    if (this.verificarPaciente(nuevoPaciente.getId())) {
      console.error(`Error: El paciente con ID ${nuevoPaciente.getId()} ya existe.`);
    } else if (!this.verificarCliente(nuevoPaciente.getId())) {
      console.error(`Error: No existe el dueño de ${nuevoPaciente.getNombre()}.`);
    } else {
      this.pacientes.push(nuevoPaciente);
      console.log(`Se agrego el paciente ${nuevoPaciente.getNombre()} correctamente.`);
    }
  }

  //Metodos delete
  public borrarSucursal(sucursalId: number): void {
    if (this.verificarSucursal(sucursalId)) {
      this.sucursales = this.sucursales.filter((sucursal) => sucursal.getId() !== sucursalId);
      GeneradorID.eliminarId(sucursalId);
      console.log(`Se borro la sucursal con ID ${sucursalId} correctamente.`);
    } else {
      console.log(`Error: La sucursal con ID ${sucursalId} no existe.`);
    }
  }
  public borrarProveedor(proveedorId: number): void {
    if (this.verificarProveedor(proveedorId)) {
      this.proveedores = this.proveedores.filter((proveedor) => proveedor.getId() !== proveedorId);
      GeneradorID.eliminarId(proveedorId);
      console.log(`Se borro el proveedor con ID ${proveedorId} correctamente.`);
    } else {
      console.log(`Error: El proveedor con ID ${proveedorId} no existe.`);
  }
}

  public borrarCliente(clienteId: number): void {
    if (this.verificarCliente(clienteId)) {
      this.clientes = this.clientes.filter((cliente) => cliente.getId() !== clienteId);
      this.pacientes = this.pacientes.filter((mascota) => mascota.getId() !== clienteId);
      GeneradorID.eliminarId(clienteId);
      console.log(`Se borro el cliente con ID ${clienteId} y sus mascotas correctamente.`);
    } else {
      console.error(`Error: El cliente con ID ${clienteId} no existe.`);
    }
  }

  public borrarPaciente(pacienteId: number): void {
    if (this.verificarPaciente(pacienteId)) {
      this.pacientes = this.pacientes.filter((paciente) => paciente.getId() !== pacienteId);
      GeneradorID.eliminarId(pacienteId);
      console.log(`Se borro el paciente con ID ${pacienteId} correctamente.`);
    } else {
      console.error(`Error: El paciente con ID ${pacienteId} no existe.`);
    }
  }

  //Metodos internos
  private verificarCliente(clienteId: number): boolean {
    return this.clientes.some((cliente) => cliente.getId() === clienteId);
  }

  private verificarProveedor(proveedorId: number): boolean {
    return this.proveedores.some((proveedor) => proveedor.getId() === proveedorId);
  }

  private verificarSucursal(sucursalId: number): boolean {
    return this.sucursales.some((sucursal) => sucursal.getId() === sucursalId);
  }

  private verificarPaciente(pacienteId: number): boolean {
    return this.pacientes.some((paciente) => paciente.getId() === pacienteId);
  }
}