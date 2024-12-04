import { Cliente } from "../models/Cliente";
import { Paciente } from "../models/Paciente";
import { VeterinariaFactory } from "../factories/VeterinariaFactory";
import { GeneradorID } from "../utils/GeneradorID";
import { solicitarDatos } from "../utils/capturar-datos";
import { PacienteRepository } from "./PacienteRepository";

export class ClienteRepository {
  private clientes: Cliente[];
  private pacienteRepo: PacienteRepository;

  constructor() {
    this.clientes = [
      new Cliente("Diego", 123456789, "Funes 5123"),
      new Cliente("Alexis", 987654321, "Azopardo 5456"),
      new Cliente("Facundo", 546578749, "Del valle 2789"),
      new Cliente("Lionel", 45648979, "Avellaneda 7489"),
    ];
    this.pacienteRepo = new PacienteRepository();
    this.pacienteRepo.ingresarPaciente(new Paciente("Negro", "perro", this.clientes[0].getId()));
    this.pacienteRepo.ingresarPaciente(new Paciente("Canela", "gato", this.clientes[1].getId()));
    this.pacienteRepo.ingresarPaciente(new Paciente("Luna", "exotica", this.clientes[2].getId()));
    this.pacienteRepo.ingresarPaciente(new Paciente("Francia", "exotica", this.clientes[3].getId()));
  }

//Getters
  public getClientes(): Array<Cliente> {
    return this.clientes;
  }

  public getPacientes(): Array<Paciente> {
    return this.pacienteRepo.getPacientes();
  }

  public getClientePorId(clienteId: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.getId() === clienteId);
  }

  public getPacientesPorCliente(): Paciente[] | undefined {
    const clienteId: string = solicitarDatos('id', ' del cliente');
    let cliente: Cliente | undefined = this.getClientePorId(clienteId);
    if (cliente) {
      let mascotas: Paciente[] = this.pacienteRepo.filterPacientes(clienteId, true, undefined);
      if (mascotas.length > 0) {
        console.log(`\nLas mascotas del cliente ${cliente.getNombre()} con ID ${clienteId} son:`);
        console.table(mascotas)
        return;
      } else {
          console.error(`\nError: No existen mascotas del cliente con ID ${clienteId}.`);
          return;
        }
    } else {
      console.error(`\nError: El cliente con ID ${clienteId} no existe.`);
      return;
      }
  }

//Metodos add
  public ingresarCliente(): void {
    const nuevoCliente : Cliente = VeterinariaFactory.crear('cliente');
    this.clientes.push(nuevoCliente);
    console.log(`\nSe agrego el cliente ${nuevoCliente.getNombre()} correctamente.`); 
  }

  public ingresarPaciente(): void {
    if (this.getClientes().length === 0) {
      console.log("\nNo existen clientes.");
      return;
    } else {
        console.table(this.getClientes());
        let nuevoPaciente: Paciente | undefined = VeterinariaFactory.crear('paciente');
        if (nuevoPaciente === undefined) {
          return;
        } else if (!this.getClientePorId(nuevoPaciente.getId())) {
            console.error(`\nError: No existe el duenio de ${nuevoPaciente.getNombre()}.`);
          } else {
            this.pacienteRepo.ingresarPaciente(nuevoPaciente);
            console.log(`\nSe agrego el paciente ${nuevoPaciente.getNombre()} correctamente.`);
            } 
      }
  }

//Metodos delete
  public eliminarCliente(): void {
    if (this.getClientes().length === 0) {
      console.log("\nNo existen clientes.");
      return;
    } else {
        console.table(this.getClientes());
        const clienteId: string = solicitarDatos('id', ' del cliente a eliminar');
        if (this.getClientePorId(clienteId)) {
          this.clientes = this.clientes.filter(cliente => cliente.getId() !== clienteId);
          this.pacienteRepo.eliminarPacientesPorCliente(clienteId);
          GeneradorID.eliminarId(clienteId);
          console.log(`\nSe elimino el cliente con ID ${clienteId} y sus mascotas correctamente.`);
        } else {
          console.error(`\nError: El cliente con ID ${clienteId} no existe.`);
        }
      }
  } 

  public eliminarPaciente(): void {
    this.pacienteRepo.eliminarPaciente();
  }

//Metodos edit
  public editarCliente(): void {
    if (this.getClientes().length === 0) {
      console.log("\nNo existen clientes.");
      return;
    } else {
        console.table(this.getClientes());
        const clienteId: string = solicitarDatos('id', ' del cliente a editar');
        const cliente: Cliente | undefined = this.getClientePorId(clienteId);
        if (cliente) {
          let editar: string = solicitarDatos('editar');
          switch (editar) {
            case "1":
              const nombre: string = solicitarDatos('nombre', ' del cliente');
              cliente.setNombre(nombre);
              console.log(`\nSe edito el nombre del cliente con ID ${clienteId} a ${cliente.getNombre()} correctamente.`); 
              break;
            case "2":
              const telefono: number = solicitarDatos('telefono', ' del cliente');
              cliente.setTelefono(telefono);
              console.log(`\nSe edito el telefono del cliente ${cliente.getNombre()} (ID ${clienteId}) a ${cliente.getTelefono()} correctamente.`); 
              break;
            case "3":
              const direccion: string = solicitarDatos('direccion', ' del cliente');
              cliente.setDireccion(direccion);
              console.log(`\nSe edito la direccion del cliente con ID ${clienteId} a ${cliente.getDireccion()} correctamente.`);
              break;
            default:
              console.error(`\nError: Opcion no valida.`);
              break;
          } 
        } else {
            console.error(`\nError: El cliente con ID ${clienteId} no existe.`);
          }
      }
  }

    public editarPaciente(): void {
      this.pacienteRepo.editarPaciente();
    }

  public atenderCliente(): void {
    if (this.getClientes().length === 0) {
      console.log("\nNo existen clientes.");
      return;
    } else {
        console.table(this.getClientes());
        const clienteId: string = solicitarDatos('id', ' del cliente')
        const cliente: Cliente | undefined = this.getClientePorId(clienteId);
        if (cliente) {
          console.log(`\nEl cliente ${cliente.getNombre()} con ID ${clienteId} tiene las siguientes mascotas:`);
          console.table(this.pacienteRepo.filterPacientes(clienteId, true, undefined));
          const nombreMascota: string = solicitarDatos('nombre', ' de la mascota que se va a atender');
          const pacienteFiltrado: Paciente[] = this.pacienteRepo.filterPacientes(clienteId, true, nombreMascota);
          if (pacienteFiltrado.length === 0) {
            console.error(`\nError: No existe la mascota con el nombre ${nombreMascota} del cliente con ID ${clienteId}.`);
          } else {
              cliente.setVisitas();
              console.log(`\nSe atendio la mascota ${nombreMascota} del cliente ${cliente.getNombre()}. Total visitas: ${cliente.getVisitas()}`);
            }
        } else {
            console.error(`\nError: No existe el cliente con ID ${clienteId}.`);
          }
      }
  }

}
