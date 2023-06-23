import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  nuevosRegistros: number = 0;

  constructor() { }

  actualizarConteo(cantidad: number) {
    this.nuevosRegistros += cantidad;
  }
}
