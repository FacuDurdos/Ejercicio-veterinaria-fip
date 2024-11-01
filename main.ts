import { Veterinaria } from "./Veterinaria";
import * as readlineSync from 'readline-sync';

function main(): void {
  let veterinaria: Veterinaria = new Veterinaria("Veterinaria Olavarria", "Av. Colon 1234");
  let ejecutando: boolean = true;
  console.log(`Sistema de gestion de ${veterinaria.getNombre()}.`);	
  
  while (ejecutando) {
    readlineSync.question(`Seleccione que accion desea realizar:
    1. Ir a seccion Clientes
    2. Ir a seccion Pacientes
    3. Ir a seccion Sucursales
    4. Ir a seccion Proveedores
    5. Atender cliente
    6. Modificar datos de la veterinaria
    7. Salir
  `);
      
  }
}