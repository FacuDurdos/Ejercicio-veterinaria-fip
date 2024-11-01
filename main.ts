import { Veterinaria } from "./Veterinaria";
import * as readlineSync from 'readline-sync';

function main(): void {
  let veterinaria: Veterinaria = new Veterinaria("Veterinaria Olavarria", "Av. Colon 1234");
  let ejecutando: boolean = true;
  console.log(`Sistema de gestion de ${veterinaria.getNombre()}.`);	
  
  while (ejecutando) {
    readlineSync.question(`Seleccione que accion desea realizar:
    1. Agregar cliente
    2. Agregar paciente
    3. Agregar sucursal
    4. Agregar proveedor
    5. Atender cliente
    6. Ver lista de clientes
    7. Ver lista de pacientes
    8. Salir
  `);
      
  }
}