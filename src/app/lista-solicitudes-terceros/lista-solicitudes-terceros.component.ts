import { Component } from '@angular/core';
import { terceroService } from '../services/tercero.service';
import { TerceroPrestamo } from '../models/TerceroPrestamo';

@Component({
  selector: 'app-lista-solicitudes-terceros',
  templateUrl: './lista-solicitudes-terceros.component.html',
  styleUrls: ['./lista-solicitudes-terceros.component.css']
})
export class ListaSolicitudesTercerosComponent {
  listaterceroP: TerceroPrestamo[] = [];

  prestados?: boolean;
  recibidos?: boolean;
  nodevuelto?: boolean;
  restituido?: boolean;
  destruido?: boolean;
  buscar?: boolean;
  constructor(private TerceroService: terceroService) { }

  ngOnInit(): void {
    this.listaPrestados();
  }

  listaPrestados() {
    this.TerceroService.obtenerTerPres().subscribe(
      response => {
        response.forEach(element => {
          if (element.prestamo?.estadoPrestamo == 2) {
            this.listaterceroP.push(element);
          }
        });
      }
    )
    this.prestados = true;
    this.recibidos = false;
    this.nodevuelto = false;
    this.restituido = false;
    this.destruido = false;
    this.buscar = false;
  }

  listaRecibidos() {

  }

  listaNoDevueltos() { }

  listaRestituidos() { }

  listaDestruidos() { }

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
    this.prestados = false;
    this.recibidos = false;
    this.nodevuelto = false;
    this.restituido = false;
    this.destruido = false;
    //buscar
    this.buscar = true;

    if (buscar2 == "") {
      this.ngOnInit();
    } else if (buscar2.length == 10) {
    }
  }
}
