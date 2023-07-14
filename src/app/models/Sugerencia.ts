import { Persona } from "./Persona";
import { Carrera } from "./Carrera";

export class Sugerencia {
    id?: number;
    descripcion?: string;
    fecha?: Date;
    estado?: boolean;
    idpersona?: Persona;

    carrera?: Carrera;
}