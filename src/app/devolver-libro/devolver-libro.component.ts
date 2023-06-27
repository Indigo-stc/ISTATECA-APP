import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../models/Prestamo';
import { Persona } from '../models/Persona';
import { prestamoService } from '../services/prestamo.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devolver-libro',
  templateUrl: './devolver-libro.component.html',
  styleUrls: ['./devolver-libro.component.css']
})
export class DevolverLibroComponent implements OnInit {
  prestamo: Prestamo = new Prestamo();
  persona: Persona = new Persona();
  reporteV: string = "";
  step = 1;
  totalSteps = 2;
  estadoActual?: number;
  hab?: string;
  estado?: string;
  soli?: string;

  solicitudCompleta?: boolean;

  constructor(private router: Router, private PrestamoService: prestamoService) { }

  ngOnInit(): void {
    let usuarioJSON = localStorage.getItem('persona') + "";
    this.persona = JSON.parse(usuarioJSON);

    var solicitudJSONGET = localStorage.getItem("AceptarSolicitud");
    var solicitud = JSON.parse(solicitudJSONGET + "");
    
    var estadoJSONGET = localStorage.getItem("estadoR");
    this.estado = JSON.parse(estadoJSONGET + "");
    
    let soliJSONGET = localStorage.getItem('solicitudCompleta'+"");
    this.soli = JSON.parse(soliJSONGET + "");
    if (this.soli == "1") {
      this.solicitudCompleta = true;
    } else {
      this.solicitudCompleta = false;
    }

    this.prestamo = solicitud;
    if (this.prestamo.documentoHabilitante == 1) {
      this.hab = "Cédula";

    } else if (this.prestamo.documentoHabilitante == 2) {
      this.hab = "Licencia";
    } else if (this.prestamo.documentoHabilitante == 3) {
      this.hab = "Pasaporte";
    }
  }
  avanzar1() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }
  retroceder1() {
    if (this.step > 1) {
      this.step--;
    }
  }
  seleccionT(e: any) {
    this.estadoActual = e.target.value;
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

  getNombreEstadoLibro(numeroEstado: number | undefined): string {
    let nombreEstado = 'Desconocido'; // Valor predeterminado si el número del estado es undefined

    if (numeroEstado !== undefined) {
      switch (numeroEstado) {
        case 1:
          nombreEstado = 'Bueno';
          break;
        case 2:
          nombreEstado = 'Regular';
          break;
        case 3:
          nombreEstado = 'Malo';
          break;
        // Agrega más casos según tus necesidades
      }
    }

    return nombreEstado;
  }


  getNombreEstadoLibro2(numeroEstado: number | undefined): string {
    let nombreEstado = 'Desconocido'; // Valor predeterminado si el número del estado es undefined

    if (numeroEstado !== undefined) {
      switch (numeroEstado) {
        case 1:
          nombreEstado = 'Nuevo';
          break;
        case 2:
          nombreEstado = 'Bueno';
          break;
        case 3:
          nombreEstado = 'Regular';
          break;
          case 4:
          nombreEstado = 'Malo';
          break;
          case 5:
          nombreEstado = 'No Utilizable';
          break;
        // Agrega más casos según tus necesidades
      }
    }

    return nombreEstado;
  }

  guardar() {
    this.prestamo.idRecibido = this.persona;
    if (this.estadoActual != undefined) {
      if (this.estadoActual == 1 || this.estadoActual == 2) {
        if (this.estado == "6") {
          alert("Restituido")
          this.prestamo.estadoPrestamo = 6;
          this.PrestamoService.update(this.prestamo).subscribe(
            response => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<strong>Restituido correctamente</strong>',
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/app-lista-solicitudes-pendientes']);
            }
          );
        } else {

          this.prestamo.estadoPrestamo = 3;
          this.PrestamoService.update(this.prestamo).subscribe(
            response => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<strong>Guardado correctamente</strong>',
                showConfirmButton: false,
                timer: 1500
              })
            }
          );
        }

      } else if (this.estadoActual == 3) {
        console.log("entro")
        Swal.fire({
          title: 'Libro Destruido',
          text: 'El prestamo se guardara como libro destruido',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.prestamo.estadoPrestamo = 4;
            Swal.fire('Confirmado', 'Tu acción ha sido confirmada', 'success');
            this.PrestamoService.update(this.prestamo).subscribe(
              response => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: '<strong>Guardado correctamente</strong>',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelado', 'Elija otro estado de libro', 'error');
            this.ngOnInit();
          }
        });

      }


    }
    this.router.navigate(['/app-lista-solicitudes-pendientes']);
  }
}
