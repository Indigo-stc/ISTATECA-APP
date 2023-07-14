import { Component } from '@angular/core';
import { Persona } from '../models/Persona';
import { Prestamo } from '../models/Prestamo';
import { Router } from '@angular/router';
import { Libro } from '../models/Libro';
import { prestamoService } from '../services/prestamo.service';
import { PersonaService } from '../services/persona.service';
import { LibroService } from '../services/libro.service';
import { terceroService } from '../services/tercero.service';
import { Observable } from 'rxjs';
import { Tercero } from '../models/Tercero';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { TerceroPrestamo } from '../models/TerceroPrestamo';

@Component({
  selector: 'app-registro-solicitud-tercerapersona',
  templateUrl: './registro-solicitud-tercerapersona.component.html',
  styleUrls: ['./registro-solicitud-tercerapersona.component.css']
})
export class RegistroSolicitudTercerapersonaComponent {
  tercero: Tercero = new Tercero();
  prestamo: Prestamo = new Prestamo();
  bibliotecario: Persona = new Persona();
  solicitante: Persona = new Persona();
  terceroPrestamo: TerceroPrestamo = new TerceroPrestamo();
  public dato!: Observable<any['']>;
  public keyword = 'nombre';

  documentoH?: number;
  fechaHoy?: string;
  fechaDespues?: string;
  boton: boolean = false;
  selectLib?: boolean = false;;
  tercerocrear?: boolean = false;;
  selectLib2?: boolean;
  prestIn?: boolean;
  libros: Libro[] = [];
  libro: Libro = new Libro();

  constructor(private TerceroServices: terceroService, private router: Router, private PrestamoService: prestamoService, private personaService: PersonaService, private libroServices: LibroService) { }

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
    console.log(this.dato);
  }

  onKeydownEvent(event: KeyboardEvent, cedula: string): void {
    if (cedula.length == 10) {
      this.TerceroServices.terceroxcedula(cedula).subscribe({
        next: response => {
          if (response != null && response != undefined) {
            this.tercero = response;
            this.tercerocrear = false;
          }
        },
        error: error => {
          if (error.status === 404) {
            this.tercero = new Tercero();
            this.tercero.cedula = cedula;
            this.tercerocrear = true;
          }
        }
      });
    }

  }

  sumarDiasExcluyendoFinesDeSemana(fecha: Date, dias: number): Date {
    const fechaAuxiliar = new Date(fecha.getTime()); // Clonar la fecha original

    for (let i = 0; i < dias; i++) {
      fechaAuxiliar.setDate(fechaAuxiliar.getDate() + 1); // Agregar un día

      // Verificar si es sábado o domingo
      if (fechaAuxiliar.getDay() === 6) { // 6 representa el sábado
        fechaAuxiliar.setDate(fechaAuxiliar.getDate() + 2); // Saltar al lunes
      } else if (fechaAuxiliar.getDay() === 0) { // 0 representa el domingo
        fechaAuxiliar.setDate(fechaAuxiliar.getDate() + 1); // Saltar al lunes
      }
    }

    return fechaAuxiliar;
  }


  prestInst() {
    const fecha = new Date(Date.now());
    this.fechaHoy = format(fecha, 'dd/MM/yyyy');
    this.prestamo.fechaEntrega = fecha;
    this.prestamo.fechaMaxima = fecha;
    this.prestIn = true;
    this.boton = true;
  }

  prestDomic() {
    const fecha = new Date(Date.now());
    this.fechaHoy = format(fecha, 'dd/MM/yyyy');
    this.prestamo.fechaEntrega = fecha;
    this.prestamo.fechaMaxima = this.sumarDiasExcluyendoFinesDeSemana(fecha, 5);
    this.fechaDespues = format(this.prestamo.fechaMaxima, 'dd/MM/yyyy');
    this.prestIn = false;
    this.boton = true;
  }

  onKeydownEvent2(event: KeyboardEvent, buscar: string): void {
    this.selectLib2 = false;
    this.libroServices.buscarLibro(buscar).subscribe(
      reponse => {
        console.log(reponse)
        this.libros = reponse;
      })
  }

  seleccionarlibro(libro2: Libro) {
    this.libro = libro2;
    this.selectLib = true;
    this.selectLib2 = true;
  }

  otroLib() {
    this.libro = new Libro;
    this.libros = [];
    this.selectLib = false;
    this.selectLib2 = undefined;
  }

  consultarID(){
  }


  guardar() {
    if (this.tercerocrear == true) {
      this.TerceroServices.create(this.tercero).subscribe(
        response => {
          Swal.fire({
            confirmButtonColor: '#012844',
            icon: 'success',
            title: 'Tercero Creado Correctamente',
            text: 'Se guardo correcatamente'
          })
        }
      );
    }
    this.prestamo.libro = this.libro;
    this.prestamo.fechaFin = new Date(Date.now());
    this.prestamo.fechaDevolucion = new Date(Date.now());
    this.prestamo.estadoLibro = 1;
    this.prestamo.estadoPrestamo = 1;
    this.prestamo.documentoHabilitante = this.documentoH;
    this.prestamo.idEntrega = this.bibliotecario;
    this.prestamo.tipoPrestamo = 3;
    this.PrestamoService.create(this.prestamo).subscribe(
      response => {
        Swal.fire({
          confirmButtonColor: '#012844',
          icon: 'success',
          title: 'Prestamo Guardado',
          text: 'Se guardo correcatamente'
        })
      },
      error => {
        console.log(error);
        Swal.fire({
          confirmButtonColor: '#012844',
          icon: 'error',
          title: 'No se pudo guardar el prestamo',
        })
      }
    );

    this.terceroPrestamo.prestamo = this.prestamo;
    this.terceroPrestamo.tercero = this.tercero;
    console.log(this.terceroPrestamo);
    this.TerceroServices.createTerPres(this.terceroPrestamo).subscribe(
      response => {
        console.log(response)
        Swal.fire({
          confirmButtonColor: '#012844',
          icon: 'success',
          title: 'Tercerossss Guardado',
          text: 'Se guardo correcatamente'
        })
        this.router.navigate(['/app-lista-solicitudes-pendientes']);
      }
    );

  }
}
