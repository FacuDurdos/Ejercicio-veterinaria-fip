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

  public atender(clienteId: number): void {
    if (!this.verificarCliente(clienteId)) {
      console.error(`Error: El cliente con ID ${clienteId} no existe.`);
    } else {
      let cliente: Cliente | undefined = this.clientes.find((cliente) => cliente.getId() === clienteId);
      if (cliente) {
        cliente.setVisitas();
        console.log(`El cliente con ID ${clienteId} se encuentra en atención.`);
      }
    }
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

  public getDueño(mascotaId: number): Cliente | undefined {
    if (!this.verificarPaciente(mascotaId)) {
      console.error(`Error: La mascota con ID ${mascotaId} no existe.`);
      return undefined;
    } else {
      let dueño: Cliente | undefined = this.clientes.find((cliente) => cliente.getId() === mascotaId);
      if (dueño instanceof Cliente) {
        console.log(`${dueño.getNombre()} es el dueño de las mascotas con ID ${mascotaId}.`);
        return dueño;
      } else {
        console.error(`Error: El dueño de las mascotas con ID ${mascotaId} no existe.`);
        return undefined;
      }
    }
  }

  public getMascotas(clienteId: number): Paciente[] | undefined {
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
    if (!this.verificarCliente(nuevoPaciente.getId())) {
      console.error(`Error: No existe el dueño de ${nuevoPaciente.getNombre()}.`);
    } else {
      this.pacientes.push(nuevoPaciente);
      console.log(`Se agrego el paciente ${nuevoPaciente.getNombre()} correctamente.`);
    }
  }

  //Metodos delete
  public eliminarSucursal(sucursalId: number): void {
    if (this.verificarSucursal(sucursalId)) {
      this.sucursales = this.sucursales.filter((sucursal) => sucursal.getId() !== sucursalId);
      GeneradorID.eliminarId(sucursalId);
      console.log(`Se elimino la sucursal con ID ${sucursalId} correctamente.`);
    } else {
      console.error(`Error: La sucursal con ID ${sucursalId} no existe.`);
    }
  }
  public eliminarProveedor(proveedorId: number): void {
    if (this.verificarProveedor(proveedorId)) {
      this.proveedores = this.proveedores.filter((proveedor) => proveedor.getId() !== proveedorId);
      GeneradorID.eliminarId(proveedorId);
      console.log(`Se elimino el proveedor con ID ${proveedorId} correctamente.`);
    } else {
      console.error(`Error: El proveedor con ID ${proveedorId} no existe.`);
  }
}

  public eliminarCliente(clienteId: number): void {
    if (this.verificarCliente(clienteId)) {
      this.clientes = this.clientes.filter((cliente) => cliente.getId() !== clienteId);
      this.pacientes = this.pacientes.filter((mascota) => mascota.getId() !== clienteId);
      GeneradorID.eliminarId(clienteId);
      console.log(`Se elimino el cliente con ID ${clienteId} y sus mascotas correctamente.`);
    } else {
      console.error(`Error: El cliente con ID ${clienteId} no existe.`);
    }
  }

  public eliminarPaciente(pacienteId: number, nombrePaciente: string): void {
    if (this.verificarPaciente(pacienteId)) {
      this.pacientes = this.pacientes.filter((paciente) => paciente.getId() !== pacienteId && paciente.getNombre() !== nombrePaciente);
      console.log(`Se elimino el paciente ${nombrePaciente} con ID ${pacienteId} correctamente.`);
    } else {
      console.error(`Error: El paciente ${nombrePaciente} con ID ${pacienteId} no existe.`);
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