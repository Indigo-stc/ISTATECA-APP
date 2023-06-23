import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamo } from '../models/Prestamo';
import Swal from 'sweetalert2';
import { prestamoService } from '../services/prestamo.service';

@Component({
  selector: 'app-lista-solicitudes-pendientes',
  templateUrl: './lista-solicitudes-pendientes.component.html',
  styleUrls: ['./lista-solicitudes-pendientes.component.css']
})
export class ListaSolicitudesPendientesComponent implements OnInit {
  listaprestamos: Prestamo[] = [];

  //Tablas
  pendientes?: boolean;
  prestados?: boolean;
  recibidos?: boolean;
  nodevuelto?: boolean;
  restituido?: boolean;
  buscar?: boolean;

  constructor(private prestamoService: prestamoService, private router: Router) { }

  ngOnInit(): void {
    this.pendientes = true;
    this.prestados = false;
    this.recibidos = false;
    this.nodevuelto = false;
    this.restituido = false;
    this.buscar = false;
    this.prestamoService.listarxestado(1).subscribe(
      response => {
        this.listaprestamos = response;
        console.log("Lista Prestamos: " + this.listaprestamos.length);
      }

    );
  }

  aceptarDomicilio(prestamo: Prestamo) {
    const objetoString = JSON.stringify(prestamo);
    localStorage.setItem("AceptarSolicitud", objetoString);
    this.router.navigate(['/app-solicitud-libro-domicilio']);
  }

  aceptar(prestamo: Prestamo) {
    const objetoString = JSON.stringify(prestamo);
    localStorage.setItem("AceptarSolicitud", objetoString);
    this.router.navigate(['/app-solicitud-libro']);
  }

  devolucion(prestamo: Prestamo) {
    const objetoString = JSON.stringify(prestamo);
    localStorage.setItem("AceptarSolicitud", objetoString);
    this.router.navigate(['/app-devolver-libro']);
  }

  listaPendientes(): void {
    this.ngOnInit();
  }

  listaPrestados(): void {
    this.prestamoService.listarxestado(2).subscribe(
      response => {
        this.listaprestamos = response;
        console.log("Lista Prestamos: " + this.listaprestamos.length);
      }

    );
    this.pendientes = false;
    this.prestados = true;
    this.recibidos = false;
    this.nodevuelto = false;
    this.restituido = false;
    this.buscar = false;
  }
  listaRecibidos(): void {
    this.prestamoService.listarxestado(3).subscribe(
      response => {
        this.listaprestamos = response;
        console.log("Lista Prestamos: " + this.listaprestamos.length);
      }

    );
    this.pendientes = false;
    this.prestados = false;
    this.recibidos = true;
    this.nodevuelto = false;
    this.restituido = false;
    this.buscar = false;
  }
  listaNoDevueltos(): void {
    this.prestamoService.listarxestado(5).subscribe(
      response => {
        this.listaprestamos = response;
        console.log("Lista Prestamos: " + this.listaprestamos.length);
      }

    );
    this.pendientes = false;
    this.prestados = false;
    this.recibidos = false;
    this.nodevuelto = true;
    this.restituido = false;
    this.buscar = false;

  }
  listaRestituidos(): void {
    this.prestamoService.listarxestado(6).subscribe(
      response => {
        this.listaprestamos = response;
        console.log("Lista Prestamos: " + this.listaprestamos.length);
      }

    );
    this.pendientes = false;
    this.prestados = false;
    this.recibidos = false;
    this.nodevuelto = false;
    this.restituido = true;
    this.buscar = false;
  }

  getNombreEstado(numeroEstado: number | undefined): string {
    let nombreEstado = 'Desconocido'; // Valor predeterminado si el número del estado es undefined

    if (numeroEstado !== undefined) {
      switch (numeroEstado) {
        case 1:
          nombreEstado = 'Solicitado';
          break;
        case 2:
          nombreEstado = 'Prestado';
          break;
        case 3:
          nombreEstado = 'Recibido';
          break;
        case 4:
          nombreEstado = 'Libro Destruido';
          break;
        case 5:
          nombreEstado = 'No Devuelto';
          break;
        case 6:
          nombreEstado = 'Restituido';
          break;
        // Agrega más casos según tus necesidades
      }
    }

    return nombreEstado;
  }



  onKeydownEvent(event: KeyboardEvent, buscar2: String): void {
    this.pendientes = false;
    this.prestados = false;
    this.recibidos = false;
    this.nodevuelto = false;
    this.restituido = false;
    //buscar
    this.buscar = true;

    if (buscar2 == "") {
      this.ngOnInit();
    } else if (buscar2.length == 10) {

      this.prestamoService.buscarPrestamo(buscar2).subscribe(
        response => {
          console.log(response);
          if (response.length == 0) {
            Swal.fire({
              title: '<strong>Prestamo no encontrado</strong>',
              confirmButtonText: 'error',
              confirmButtonColor: '#012844',
              icon: 'error',
            })
            this.ngOnInit();
          } else {

            this.listaprestamos = response;
          }
        }
      );
    }
  }

}