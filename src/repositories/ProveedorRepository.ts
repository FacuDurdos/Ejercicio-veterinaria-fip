import { Proveedor } from "../models/Proveedor";
import { VeterinariaFactory } from "../factories/VeterinariaFactory";
import { GeneradorID } from "../utils/GeneradorID";
import { solicitarDatos } from "../utils/capturar-datos";

export class ProveedorRepository {
  private proveedores: Proveedor[];

  constructor() {
    this.proveedores = [
      new Proveedor("Alimentos Balanceados", 123456789, "Urquiza 4567"),
      new Proveedor("Insumos veterinaria", 987654321, "Sarmiento 1234"),
      new Proveedor("Acuarios", 123456789, "Pringles 7842"),
    ];
  }

  public getProveedores(): Proveedor[] {
    return this.proveedores;
  }

  public getProveedorPorId(id: string): Proveedor | undefined {
    return this.proveedores.find((proveedor) => proveedor.getId() === id);
  }

  public ingresarProveedor(): void {
    const nuevoProveedor: Proveedor = VeterinariaFactory.crear('proveedor');
    this.proveedores.push(nuevoProveedor);
    console.log(`\nSe agrego el proveedor ${nuevoProveedor.getNombre()} correctamente.`);
  }

  public eliminarProveedor(): void {
    if (this.getProveedores().length === 0) {
      console.log("\nNo existen proveedores.");
      return;
    } else {
        console.table(this.getProveedores());
        const proveedorId: string = solicitarDatos('id', ' del proveedor a eliminar');
        if (this.getProveedorPorId(proveedorId)) {
          this.proveedores = this.proveedores.filter((proveedor) => proveedor.getId() !== proveedorId);
          GeneradorID.eliminarId(proveedorId);
          console.log(`\nSe elimino el proveedor con ID ${proveedorId} correctamente.`);
        } else {
            console.error(`\nError: El proveedor con ID ${proveedorId} no existe.`);
          } 
      }
  }

  public editarProveedor(): void {
    if (this.getProveedores().length === 0) {
      console.log("\nNo existen proveedores.");
      return;
    } else {
        console.table(this.getProveedores());
        const proveedorId: string = solicitarDatos('id', ' del proveedor a editar');
        const proveedor: Proveedor | undefined = this.getProveedorPorId(proveedorId);
        if (proveedor) {
          let editar: string = solicitarDatos('editar');
          switch (editar) {
            case '1':
              const nuevoNombre: string = solicitarDatos('nombre', ' del proveedor');
              proveedor.setNombre(nuevoNombre);
              console.log('\nProveedor editado correctamente.');
              break;
            case '2':
              const nuevoTelefono: number = solicitarDatos('telefono', ' del proveedor');
              proveedor.setTelefono(nuevoTelefono);
              console.log('\nProveedor editado correctamente.');
              break;
            case '3':
              const nuevaDireccion: string = solicitarDatos('direccion', ' del proveedor');
              proveedor.setDireccion(nuevaDireccion);
              console.log('\nProveedor editado correctamente.');
              break;
            default:
              console.error('\nError: Opcion no valida');
              break;
          }
        } else {
          console.error(`\nError: No existe el proveedor con ID ${proveedorId}.`);
        }
      }
  }
}