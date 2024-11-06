// TODO: CLASE DATOS CON PROPS ID/NOMBRE/DIRECCION/TELEFONO


import { menuPrincipal } from "../menus/menuPrincipal";
import { Veterinaria } from "../models/Veterinaria";
import { generarData } from "./GenerarData";

let veterinaria = generarData();

function main(veterinaria: Veterinaria): void {
  menuPrincipal(veterinaria);
}

main(veterinaria);