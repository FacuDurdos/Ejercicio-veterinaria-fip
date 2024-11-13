import { menuPrincipal } from "../menus/menuPrincipal";
import { Veterinaria } from "../models/Veterinaria";


let veterinaria = new Veterinaria("Veterinaria Olavarria", "Colon 1234");

function main(veterinaria: Veterinaria): void {
  menuPrincipal(veterinaria);
}

main(veterinaria);