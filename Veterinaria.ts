/* propiedades: Nombre, direccion, id( GeneradorID.generarID ),
              sucursales: Veterinaria [ ], clientes: Clientes [ ], pacientes: Pacientes [ ], proveedores: Proveedores [ ]

metodos: getters, setters (add y delete que tiene que incluir borrarID de GeneradorID),
                  atender (aumenta visitas del cliente), getDueño (para obtener el dueño de una mascota),
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
}