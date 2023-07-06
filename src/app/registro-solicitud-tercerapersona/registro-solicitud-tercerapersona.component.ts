import { Component } from '@angular/core';
import { Persona } from '../models/Persona';
import { Prestamo } from '../models/Prestamo';
import { Router } from '@angular/router';
import { prestamoService } from '../services/prestamo.service';
import { PersonaService } from '../services/persona.service';
import { LibroService } from '../services/libro.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro-solicitud-tercerapersona',
  templateUrl: './registro-solicitud-tercerapersona.component.html',
  styleUrls: ['./registro-solicitud-tercerapersona.component.css']
})
export class RegistroSolicitudTercerapersonaComponent {
  prestamo: Prestamo = new Prestamo();
  bibliotecario: Persona = new Persona();
  solicitante:Persona= new Persona();
  public dato!: Observable<any['']>;
  public keyword = 'nombre';

  documentoH?: number;

  constructor(private router: Router, private PrestamoService: prestamoService, private personaService: PersonaService, private libroServices: LibroService) { }

  ngOnInit(): void {
    

    let usuarioJSON = localStorage.getItem('persona') + "";
    this.bibliotecario = JSON.parse(usuarioJSON);
    this.obtenerAutor();
  }

  seleccionD(e: any) {
    this.documentoH = e.target.value;
  }

  obtenerAutor(): void {
    this.dato = this.libroServices.obtenerLibros();
    console.log(this.dato );
  }

  guardar(){

  }
}
