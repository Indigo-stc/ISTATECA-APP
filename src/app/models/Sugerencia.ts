import { Persona } from "./Persona";
import { Carrera } from "./Carrera";

export class Sugerencia {
    id?: number;
    description?: string;
    fecha?: Date;
    estado?: boolean;
    idpersona?: Persona;

    carrera?: Carrera;
}