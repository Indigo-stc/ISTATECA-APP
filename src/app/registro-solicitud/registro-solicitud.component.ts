import { Component } from '@angular/core';
import { Prestamo } from '../models/Prestamo';
import { prestamoService } from '../services/prestamo.service';
import { Carrera } from '../models/Carrera';
import { CarreraService } from '../services/carrera.service';
import { Persona } from '../models/Persona';
import { PersonaService } from '../services/persona.service';
import { Router } from '@angular/router';
import { Libro } from '../models/Libro';
import { LibroService } from '../services/libro.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.css']
})
export class RegistroSolicitudComponent {
  prestamo: Prestamo = new Prestamo();
  persona: Persona = new Persona();
  bibliotecario: Persona = new Persona();
  carreras: Carrera[] = [];
  public dato!: Observable<any['']>;
  public keyword = 'el';
  libros: Libro[] = [];
  idC?: number;
  documentoH?: number;


  constructor(private router: Router, private carreraService: CarreraService, private PrestamoService: prestamoService, private personaService: PersonaService, private libroServices: LibroService) { }

  ngOnInit(): void {


    let usuarioJSON = localStorage.getItem('persona') + "";
    this.bibliotecario = JSON.parse(usuarioJSON);
    this.carreraService.getCarreras().subscribe(
      respose => {
        this.carreras = respose;
      }
    );
    this.obtenerLibros();
  }
  seleccionT(e: any) {
    this.idC = e.target.value;
  }
  seleccionD(e: any) {
    this.documentoH = e.target.value;
  }

  obtenerLibros(): void {
    this.dato = this.libroServices.obtenerLibros();
    console.log(this.dato);
  }
  buscarCed(cedula: string) {
    if (cedula == "") {
      Swal.fire({
        confirmButtonColor: '#012844',
        icon: 'warning',
        title: 'Ups...',
        text: 'Ingrese la cédula'
      })
    } else {
      if (cedula.length === 10) {
        this.personaService.listarxcedula(cedula).subscribe(
          response => (this.persona = response),
          error => (Swal.fire({
            confirmButtonColor: '#012844',
            icon: 'warning',
            title: 'No encontrado',
            text: 'Usuario no encontrado en el sistema'
          }), this.persona.cedula = "")


        )
      }

    }



  }

  guardar() {
    this.prestamo.idSolicitante = this.persona;
    if (this.idC != undefined) {
      this.carreraService.obtenerCarreraId(this.idC).subscribe(
        response => {
          this.prestamo.carrera = response;
        }
      );
    }
    this.prestamo.documentoHabilitante = this.documentoH;
    this.prestamo.idEntrega = this.bibliotecario;
    this.PrestamoService.create(this.prestamo).subscribe(
      response => (Swal.fire({
        confirmButtonColor: '#012844',
        icon: 'success',
        title: 'Prestamo Guardado',
        text: 'Se gusrado correcatamente'
      })),
      error => (Swal.fire({
        confirmButtonColor: '#012844',
        icon: 'error',
        title: 'No se pudo guardar el prestamo',
      }))
    );
  }

}
